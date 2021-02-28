import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchLeaveRequests } from "../../redux/actions/leave"
import ListLeaveApplications from './ListLeaveApplications';

function OfficersLeave({ fetchLeaveRequests, leave, loading }) {
    useEffect(() => {
        const fetchLeave = async () => {
            await fetchLeaveRequests()
        }
        fetchLeave();
        return () => {

        }
    }, [fetchLeaveRequests])

    return (
        <ListLeaveApplications type={"officers_leave"} leave={leave.officers_leave} loading={loading} />
    )
}

const mapStateToProps = state => ({
    leave: state.leave.leave,
    loading: state.leave.loading
})

export default connect(mapStateToProps, { fetchLeaveRequests })(OfficersLeave)
