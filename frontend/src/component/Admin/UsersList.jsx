import React, { Fragment, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../Redux/actions/userAction";
import { DELETE_USER_RESET } from "../../Redux/constants/userConstants";
import Loader from "../layout/Loader/Loader";

const UsersList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { users, error } = useSelector((state) => state.allUsers);
  const {
    loading,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, history, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 140, flex: 0.3 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 230,
      flex: 0.4,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL USERS - Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          {users.length === 0 ? (
            <div className="noItemPage">No Users</div>
          ) : (
            <div className="productListContainer">
              <h1 id="productListHeading">ALL USERS</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
