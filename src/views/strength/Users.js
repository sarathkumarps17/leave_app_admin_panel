import React, { useState, useEffect, Fragment, useCallback } from "react";
// import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { CCol, CDataTable, CRow, CButton } from "@coreui/react";
// import getFulldate from "../../utils/date";
// import CIcon from "@coreui/icons-react";
// import { freeSet } from "@coreui/icons";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// const getBadge = (isActive) => {
//   switch (isActive) {
//     case true:
//       return "success";
//     // case 'Inactive': return 'secondary'
//     // case 'Pending': return 'warning'
//     case false:
//       return "danger";
//     default:
//       return "primary";
//   }
// };

const fields = [
  { key: "name", _style: { width: "20%" } },
  { key: "penNumber", label: "Pen Number", _style: { width: "20%" } },
  {
    key: "station",
    _style: { width: "20%" },
  },
  {
    key: "dutyStatus",
    label: "Duty Status",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
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
const ListAlbum = ({ data, userType }) => {
  const [toggling, setToggling] = useState("");
  const initialState = {
    users: [...data.users],
    loading: data.loading,
  };
  const [state, setState] = useState(initialState);
  return (
    <div>
      <h1>{userType}</h1>
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
                items={state.users}
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

export default ListAlbum;
