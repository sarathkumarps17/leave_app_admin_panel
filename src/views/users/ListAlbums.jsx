import React, { useState, useEffect, Fragment, useCallback } from "react";
// import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { CCol, CDataTable, CRow, CButton } from "@coreui/react";
import Carosal from "./Carosal";
import { getAlbums, toggleAlbumStatus } from "src/redux/actions/get-album";
import getFulldate from "../../utils/date";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons';
import { connect } from "react-redux";
import PropTypes from "prop-types";
const getBadge = (isActive) => {
  switch (isActive) {
    case true:
      return "success";
    // case 'Inactive': return 'secondary'
    // case 'Pending': return 'warning'
    case false:
      return "danger";
    default:
      return "primary";
  }
};

const fields = [
  { key: "name", _style: { width: "20%" } },
  { key: "description", _style: { width: "10%" } },
  { key: "files", _style: { width: "5%" }, filter: false },
  { key: "views", _style: { width: "5%" }, filter: false },
  { key: "createdAt", _style: { width: "20%" } },
  {
    key: "status",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
];

const ListAlbum = ({ match, toggleAlbumStatus }) => {
  const [toggling, setToggling] = useState("");
  const [showAlbum, setShowAlbum] = useState({
    files: [],
    show: false,
  });
  const initialState = { loading: true, albums: [] };
  const [state, setstate] = useState(initialState);

  const fetchAlbums = async (id) => {
    let albums = await getAlbums(id);
    if (!albums) {
      setstate(initialState);
    } else {
      setstate({
        albums: albums,
        loading: false,
      });
    }
  };
  useEffect(() => {
    fetchAlbums(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id, showAlbum]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleStatus = useCallback(async (id) => {
    // console.log(id);
    setToggling(id);
    let action = await toggleAlbumStatus(id);
    fetchAlbums(match.params.id);
    setToggling("");
    if (!action) {
      alert("Sorry server is busy");
    }
  });
  try {
    if (state.albums) {
      state.albums.forEach((album, index) => {
        album.createdAt = getFulldate(album.createdAt);
      });
      // console.log(state.albums);
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      {state.loading || !state.albums ? (
        <Loader
          className="loader"
          type="Puff"
          color="#321FDB"
          height={150}
          width={150}
          timeout={3000} //3 secs
        />
      ) : state.albums.message ? (
        <Fragment>
          <div className="msg">
            <h3>{state.albums.message}</h3>
            <CIcon content={freeSet.cilBan} height="50" className="my-4" />
          </div>
        </Fragment>
      ) : (
            <Fragment>
              {!showAlbum.show ? (
                <CRow>
                  <CCol xl={12}>
                    <CDataTable
                      items={state.albums}
                      fields={fields}
                      hover
                      sorter
                      striped
                      itemsPerPage={5}
                      itemsPerPageSelect
                      pagination
                      columnFilter
                      scopedSlots={{
                        status: (item) => (
                          <td className="py-2">
                            <CButton
                              variant="outline"
                              shape="square"
                              size="sm"
                              color={getBadge(!item.isBlocked)}
                              onClick={() => toggleStatus(item._id)}
                            >
                              {toggling === item._id
                                ? "loading.."
                                : !item.isBlocked
                                  ? "Active"
                                  : "Blocked"}
                            </CButton>
                          </td>
                        ),
                        show_details: (item, index) => {
                          return (
                            <td className="py-2" key={index}>
                              <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() =>
                                  setShowAlbum({
                                    files: item.files,
                                    show: true,
                                  })
                                }
                              >
                                Show
                          </CButton>
                            </td>
                          );
                        },
                        files: (item, index) => (
                          <td key={index}>{item.files.length}</td>
                        ),
                      }}
                    />
                  </CCol>
                </CRow>
              ) : (
                  <Carosal slides={showAlbum.files} setShowAlbum={setShowAlbum} />
                )}
            </Fragment>
          )}
    </div>
  );
};

export default connect(null, { toggleAlbumStatus })(ListAlbum);
