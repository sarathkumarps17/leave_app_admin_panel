import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
// import openSocket from "socket.io-client";
import setAuthToken from "../utils/setAuthToken";
import action from "../redux/actions/api";

const TheHeaderDropdownNotif = () => {
  const initialState = {};
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const { REACT_APP_API_URL } = process.env;

  const getNotificatios = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        let res = await action.get("/admin/notification");
        if (res.status === 200) {
          console.log(res.data);
          setState(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const clearNotification = async (type) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        let res = await action.put(`/admin/clearNotification/${type}`);
        if (res.status === 200) {
          console.log(res.data);
        }
        getNotificatios();
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    // const socket = openSocket(REACT_APP_API_URL, { transports: ['websocket', 'polling', 'flashsocket'] });
    // socket.on("notification", data => {
    //     // console.log(data)
    //     if (data) {
    //         setState(data);
    //     }
    // });
    // getNotificatios();
    // return () => {
    // }
  }, [REACT_APP_API_URL]);
  let {
    newAdvertiser,
    adCreated,
    adDeleted,
    adDeactivated,
    adActivated,
  } = state;
  let notificationCount =
    newAdvertiser + adCreated + adDeactivated + adDeleted + adActivated;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        {notificationCount ? (
          <CBadge shape="pill" color="success">
            {notificationCount}
          </CBadge>
        ) : null}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {notificationCount} notifications</strong>
        </CDropdownItem>

        {newAdvertiser > 0 ? (
          <CDropdownItem
            onClick={async () => {
              await clearNotification("newAdvertiser");
            }}
          >
            <CIcon
              content={freeSet.cilUserFollow}
              className="mr-2 text-success"
            />{" "}
            {newAdvertiser} New Advertiser on Board{" "}
          </CDropdownItem>
        ) : null}

        {adCreated ? (
          <CDropdownItem
            onClick={async () => {
              await clearNotification("adCreated");
              history.push("newAds");
            }}
          >
            <CIcon content={freeSet.cilNoteAdd} className="mr-2 text-success" />{" "}
            {adCreated} New Ad Created{" "}
          </CDropdownItem>
        ) : null}
        {adActivated ? (
          <CDropdownItem
            onClick={async () => {
              await clearNotification("adActivated");
            }}
          >
            <CIcon content={freeSet.cilNoteAdd} className="mr-2 text-success" />{" "}
            {adActivated} Ad activated{" "}
          </CDropdownItem>
        ) : null}

        {adDeactivated ? (
          <CDropdownItem
            onClick={async () => {
              await clearNotification("adDeactivated");
            }}
          >
            <CIcon content={freeSet.cilDelete} className="mr-2 text-warning" />{" "}
            {adDeactivated} Ad Deactivated{" "}
          </CDropdownItem>
        ) : null}
        {adDeleted ? (
          <CDropdownItem
            onClick={async () => {
              await clearNotification("adDeleted");
            }}
          >
            <CIcon content={freeSet.cilDelete} className="mr-2 text-danger" />{" "}
            {adDeleted} Ad Deleted{" "}
          </CDropdownItem>
        ) : null}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
