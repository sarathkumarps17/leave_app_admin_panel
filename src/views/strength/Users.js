import React, { useEffect, Fragment } from "react";
// import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { CCol, CDataTable, CRow, CButton, CBadge } from "@coreui/react";
import { fetchUsers } from "../../redux/actions/user"
import { connect } from "react-redux";

const acFields = [
  { key: "name", _style: { width: "20%" } },
  { key: "penNumber", label: "Pen Number", _style: { width: "20%" } },
  {
    label: "Subdivision",
    key: "subdivision",
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
    key: "email",
    label: "Email",
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
const officersFields = [
  { key: "name", _style: { width: "20%" } },
  { key: "penNumber", label: "Pen Number", _style: { width: "20%" } },
  {
    label: "Station",
    key: "station",
    _style: { width: "20%" },
  },
  {
    label: "Station charge",
    key: "station_charge",
    _style: {
      width: "10%",
      sorter: false,
      filter: false,
    },
  },
  {
    key: "dutyStatus",
    label: "Duty Status",
    _style: { width: "20%" },
    sorter: false,
    filter: false,
  },
  {
    key: "email",
    label: "Email",
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
]

const Users = ({ userType, users, loading, fetchUsers }) => {

  useEffect(() => {
    fetchUsers(userType);
    return () => {
    }
  }, [fetchUsers, userType])
  let designation;
  let type;
  let fields;
  switch (userType) {
    case 2:
      designation = "Assistant Commisionrs"
      type = "AC"
      fields = acFields
      break;
    case 3:
      designation = "Inspectors"
      type = "CI"
      fields = officersFields
      break;
    case 4:
      designation = "Sub Inspectors"
      type = "SI"
      fields = officersFields
      break;
    default:
      break;
  }
  return (
    <div>
      <h1>{designation}</h1>
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
                  items={users[type]}
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
                          <CButton size="sm" className="btn-square" color="primary" children="Show" />
                        </td>
                      );
                    },
                    subdivision: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.subdivision.name}
                        </td>
                      );
                    },
                    station: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.station.name}
                        </td>
                      );
                    },
                    station_charge: (item, index) => {
                      return (
                        <td className="py-2" key={index}>
                          {item.stationCharge ? <CBadge children="SHO" color="warning" /> : "Nill"}
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
const mapStateToProps = state => ({
  users: state.users
})
export default connect(mapStateToProps, { fetchUsers })(Users);
