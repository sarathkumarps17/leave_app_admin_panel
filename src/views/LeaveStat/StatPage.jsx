import React, { useState, useEffect, Fragment } from 'react';
import { CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import Loader from "react-loader-spinner";
import LeaveList from "./LeaveList";
import { connect } from 'react-redux';
import { getUserLeaveList } from "../../redux/actions/dashboard";

function StatPage({ getUserLeaveList }) {
    const [loading, setLoading] = useState(false);
    const initialState = { ac: [], io: [], si: [] }
    const [leaveList, setLeaveList] = useState(initialState)
    const fetchUserLeaveList = async (buffer) => {
        setLoading(true);
        let res = await getUserLeaveList(buffer);
        if (res) setLeaveList(res);
        setLoading(false);
    }
    useEffect(() => {
        fetchUserLeaveList(5);
        return () => {
        }
    }, []);
    const [tab, setTab] = useState(1)
    return (
        <Fragment>
            {
                loading ? (
                    <Loader
                        className="loader"
                        type="Puff"
                        color="#321FDB"
                        height={150}
                        width={150}
                        timeout={3000} //3 secs
                    />
                ) : (<CTabs activeTab={tab} onActiveTabChange={id => setTab(id)}>
                    <CNav variant="tabs">
                        <CNavItem>
                            <CNavLink >
                                ACs
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink >
                                IOs
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink >
                                SIs
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent fade={false}>
                        <CTabPane>
                            <LeaveList userType={"ac"} leaveList={leaveList["ac"]} />
                        </CTabPane>
                        <CTabPane>
                            <LeaveList userType={"io"} leaveList={leaveList["io"]} />
                        </CTabPane>
                        <CTabPane>
                            <LeaveList userType={'si'} leaveList={leaveList["si"]} />
                        </CTabPane>
                    </CTabContent>
                </CTabs>)
            }
        </Fragment>




    )
}

const mapDispatchToProps = {
    getUserLeaveList
}
export default connect(null, mapDispatchToProps)(StatPage)
