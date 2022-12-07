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
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../Redux/actions/productAction";

import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../Redux/constants/productConstants";
import Loader from "../layout/Loader/Loader";

const ProductList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error } = useSelector((state) => state.adminProducts);
  const {
    loading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.adminProduct);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Delete Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 340,
      flex: 0.8,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 110,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 220,
      flex: 0.4,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - Admin" />
      {loading ? (
        <Loader/>
        ) : (
        <div className="dashboard">
          <Sidebar />
          {products.length === 0 ? (
            <div className="noItemPage">No Products</div>
          ) : (
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
