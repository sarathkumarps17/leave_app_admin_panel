import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from "react-redux";
import { dashboardData } from "../../redux/actions/dashboard";
import Loader from "react-loader-spinner";
const localizer = momentLocalizer(moment);



const LeaveCalendar = ({ data, dashboardData, loading }) => {
    const [state, setstate] = useState([])
    useEffect(() => {
        const fetchDashBoardData = async () => {
            await dashboardData();
        }
        fetchDashBoardData();
        if (Array.isArray(data)) setstate(data);
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <div className="leave-calendar">
            {loading ? (
                <Loader
                    className="loader"
                    type="Puff"
                    color="#321FDB"
                    height={150}
                    width={150}
                    timeout={3000} //3 secs
                />
            ) : <Calendar
                    localizer={localizer}
                    events={state}
                    startAccessor="start"
                    endAccessor="end"
                // style={{ height: 500 }}
                />}

        </div>
    )


}
const mapStateToProps = state => ({
    data: state.data.data,
    loading: state.data.loading
})
export default connect(mapStateToProps, { dashboardData })(LeaveCalendar)
