import React, { useEffect, useState } from "react";
import action from "../../redux/actions/api";
import getFullDate from "../../utils/date";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

const brandSuccess = getStyle("warning") || "#F9B115";
// const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("success") || "#AAE2BD";

function ChartElement({ id }) {
    const [state, setstate] = useState({
        clickData: [],
        viewData: [],
        loading: false,
    });
    const fetchdata = async () => {
        setstate((preVal) => {
            return {
                ...preVal,
                loading: true,
            };
        });
        try {
            let res = await action.get(`/admin/clickstatistics/${id}/1/${true}`)
            if (res.data) {
                // console.log(res.data);
                setstate((preVal) => {
                    return {
                        ...preVal,
                        clickData: res.data.clickData,
                        loading: false,
                    };
                });
            }
        } catch (error) {
            console.log(error);
        }
        try {
            let res = await action.get(`/admin/viewstatistics/${id}/1/${true}`)
            if (res.data) {
                // console.log(res.data);
                setstate((preVal) => {
                    return {
                        ...preVal,
                        viewData: res.data.viewData,
                        loading: false,
                    };
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchdata();
        return () => { };
    }, []);

    let views = [];
    let clicks = [];
    let intervel = [];
    console.log(state);
    state.clickData.forEach((data) => {
        clicks.push(data.count);
        // let endDate = new Date(data.end);
        let date = getFullDate(data.end);
        intervel.push(date);
    });
    state.viewData.forEach((data) => {
        views.push(data.count);
    });
    const defaultDatasets = (() => {
        return [
            {
                label: "Views",
                backgroundColor: "transparent",
                borderColor: brandSuccess,
                pointHoverBackgroundColor: brandSuccess,
                borderWidth: 2,
                data: views,
            },
            {
                label: "Clicks",
                backgroundColor: "transparent",
                borderColor: brandDanger,
                pointHoverBackgroundColor: brandDanger,
                borderWidth: 3,
                data: clicks,
            },
        ];
    })();

    const defaultOptions = (() => {
        let maxviews = Math.max(...views);
        let maxclicks = Math.max(...clicks);
        let maxValue = Math.max(maxviews, maxclicks);
        return {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            stepSize: Math.ceil((maxValue + 4) / 10),
                            max: maxValue + 4,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                },
            },
        };
    })();

    // render
    return (
        <CChartLine
            datasets={defaultDatasets}
            options={defaultOptions}
            labels={intervel}
        />
    );
};
export default ChartElement
