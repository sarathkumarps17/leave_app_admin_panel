import React, { useState, Fragment } from "react";
import Loader from "react-loader-spinner";


import { CContainer, CCol, CDataTable, CRow, CButton, CModalHeader, CModalBody, CModal } from "@coreui/react";
import LeaveDetails from "./LeaveDetails";
const ACfields = [
  { key: "reqNumber", label: "Req Number", _style: { width: "10%" } },
  {
    key: "applicationDate",
    label: "Date of Application",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  { key: "user", label: "Applicant", _style: { width: "20%" } },
  {
    key: "subdivision",
    label: "Subdivision",
    _style: { width: "20%" },
  },

  {
    key: "lastLeave",
    label: "Last Approved Leave",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  {
    key: "show_details",
    label: "Details",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];
const officersField = [
  {
    key: "reqNumber", label: "Req Number", _style: { width: "5%" }, sorter: false,
    filter: false,
  },
  {
    key: "applicationDate",
    label: "Date of Application",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  {
    key: "user", label: "Applicant", _style: { width: "20%" }, sorter: false,
    filter: false,
  },
  {
    key: "station",
    _style: { width: "20%" },
  },

  {
    key: "lastLeave",
    label: "Last Leave",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  {
    key: "show_details",
    label: "Details",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];


const ListLeaveApplications = ({ loading, leave, type }) => {
  const initialState = {
    show: false,
    leave: {}
  };
  const [show, setshow] = useState(initialState);
  let fields = officersField
  if (type === "ac_leave") fields = ACfields;

  return (
    <div>
      <CModal className="leave_model" size="lg" show={show.show} onClose={() => setshow({ show: false, ad: "" })}>
        <CModalHeader closeButton>
          <CRow className="justify-content-center">
            <CCol sm={6}>
              <h4 className="ad_view_heading">
                Leave Confirmation
                    </h4>
            </CCol>
          </CRow>
        </CModalHeader>
        <CContainer fluid>
          <CModalBody>
            {show.show && <LeaveDetails tyep={type} leave={show.leave} modelShow={setshow} />}
          </CModalBody>
        </CContainer>
      </CModal>
      <h1>{type === "ac_leave" ? "AC" : "Officer's"} Leave Applications</h1>
      {loading ? (
        <Loader
          className="loader"
          type="Puff"
          color="#321FDB"
          height={150}
          width={150}
          timeout={3000} //3 secs
        />
      ) : (
          <Fragment>
            <CRow>
              <CCol xl={12}>
                <CDataTable
                  items={leave}
                  fields={fields}
                  hover
                  sorter
                  striped
                  itemsPerPage={5}
                  itemsPerPageSelect
                  pagination
                  columnFilter
                  scopedSlots={{
                    reqNumber: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.reqNumber}
                        </td>
                      );
                    },
                    applicationDate: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {new Date(item.applicationDate).toDateString().slice(3)}
                        </td>
                      );
                    },
                    user: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.userId && <> <h6>Name : {item.userId.name}</h6>
                            PEN : {item.userId.penNumber}</>}
                        </td>
                      );
                    },
                    subdivision: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {(item.userId && item.userId.subdivision) && <h6>{item.userId.subdivision.name.toUpperCase()}</h6>}
                        </td>
                      );
                    },
                    station: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {(item.userId && item.userId.station) && <><h6>{item.userId.station.name.toUpperCase()}</h6>
                            {item.userId.stationCharge && "SHO"}
                          </>}
                        </td>
                      );
                    },
                    lastLeave: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.userId.lastLeaveDate.length && item.userId.lastLeaveDate.map((entry, ind) => <p key={ind}>{new Date(entry).toDateString().slice(3)}</p>)}
                        </td>
                      );
                    },
                    show_details: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          <CButton variant="outline" color="primary" className="btn-square" size="sm" children="show"
                            onClick={() =>
                              setshow({
                                show: true,
                                leave: item
                              })
                            }

                          />
                        </td>
                      );
                    },
                  }}
                />
              </CCol>
            </CRow>
          </Fragment>
        )}
    </div>
  );
};

export default ListLeaveApplications;
