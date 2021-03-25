import React from 'react';
import { CBadge, CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";

export const LeaveList = ({ leaveList, userType }) => {
    console.log(leaveList);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <CCardHeader>
                            Leave Stat
            </CCardHeader>
                        {
                            leaveList.length && <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                                <thead className="small thead-light">
                                    <tr>
                                        <th>User</th>
                                        {leaveList[0].dateList.map((date, ind) => {
                                            return <th key={ind} className="text-center"> {date.date}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaveList.map((user, ind) => {
                                            return <tr key={ind}>
                                                <td>
                                                    <div>{user.name}</div>
                                                    <div className="small text-muted">
                                                        <span>{userType.toUpperCase()}</span>  {user.subdivision ? user.subdivision.name : (user.station && user.station.name)}
                                                    </div>
                                                </td>
                                                {user.dateList.map(date => date.leaveType ? <td><CBadge color="warning" shape="pill" >{date.leaveType.toUpperCase()}</CBadge></td> : <td><CBadge color="success" shape="pill" >Active</CBadge></td>)}
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        }

                    </CCardBody>

                </CCard>
            </CCol>
        </CRow>

    )
}


export default (LeaveList)
