import React, { useState, useEffect, Fragment } from "react";
import Loader from "react-loader-spinner";
import { CCol, CDataTable, CRow, CButton } from "@coreui/react";
const fields = [
  { key: "reqNumber", label: "Req Number", _style: { width: "5%" } },
  { key: "user", label: "Applicant", _style: { width: "20%" } },
  {
    key: "station",
    _style: { width: "20%" },
  },
  {
    key: "applicationDate",
    label: "Date of Application",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  {
    key: "LeaveType",
    label: "Leave Type",
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

const ListLeaveApplications = () => {
  const initialState = {
    leaves: [],
    loading: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchLeave = async () => {
      let res;
      try {
        if (res.data) {
          setState({ leave: res.data, loading: false });
        }
      } catch (error) {}
    };
    fetchLeave();
  }, []);

  return (
    <div>
      <h1>Leave Applications</h1>
      {state.loading ? (
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
                items={state.leaves}
                fields={fields}
                hover
                sorter
                striped
                itemsPerPage={5}
                itemsPerPageSelect
                pagination
                columnFilter
                scopedSlots={{
                  show_details: (item, index) => {
                    return (
                      <td className="py-2" key={index}>
                        <CButton color="success" children="active" />
                      </td>
                    );
                  },
                  files: (item, index) => <td></td>,
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
