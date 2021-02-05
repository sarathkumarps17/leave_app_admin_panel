import React, { useEffect, useState } from "react";
import action from "../../redux/actions/api";
import getFullDate from "../../utils/date";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

const brandSuccess = getStyle("warning") || "#F9B115";
// const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("success") || "#AAE2BD";

const UserStatChart = (attributes) => {
  const [state, setstate] = useState({
    userdata: [],
    advertiserdata: [],
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
      let res = await action.get(`/admin/statistics/${1}/${true}`);
      if (res.data) {
        // console.log(res.data);
        setstate({
          userdata: res.data.user,
          advertiserdata: res.data.advertiser,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
    return () => {};
  }, []);
  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };
  let userCount = [];
  let advertiserCount = [];
  let intervel = [];

  state.userdata.forEach((data) => {
    userCount.push(data.count);
    // let endDate = new Date(data.end);
    let date = getFullDate(data.end);
    intervel.push(date);
  });
  state.advertiserdata.forEach((data) => {
    advertiserCount.push(data.count);
  });

  const defaultDatasets = (() => {
    return [
      {
        label: "Users",
        backgroundColor: "transparent",
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: userCount,
      },
      {
        label: "Advertisers",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 3,
        data: advertiserCount,
      },
    ];
  })();

  const defaultOptions = (() => {
    let maxUserCount = Math.max(...userCount);
    let maxAdvertiserCount = Math.max(...advertiserCount);
    let maxValue = Math.max(maxUserCount, maxAdvertiserCount);
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
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={intervel}
    />
  );
};

export default UserStatChart;
