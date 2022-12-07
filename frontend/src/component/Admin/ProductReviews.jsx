import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import StarIcon from "@material-ui/icons/Star";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllReviews,
  clearErrors,
  deleteReview,
} from "../../Redux/actions/productAction";
import { DELETE_REVIEW_RESET } from "../../Redux/constants/productConstants";
import "./ProductReviews.css";
import Loader from "../layout/Loader/Loader";

const ProductReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, reviews, error } = useSelector(
    (state) => state.productReviews
  );
  const {
    loading: deleteLoading,
    isDeleted,
    error: deleteError,
  } = useSelector((state) => state.review);
  const [productId, setProductId] = useState("");

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
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
      alert.success("Review Deleted Successfully");
      dispatch(getAllReviews(productId));
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS -- Admin" />
      {deleteLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />

          <div className="productReviewContainer">
            <form
              className="productReviewForm"
              onSubmit={productReviewSubmitHandler}
            >
              <h1 className="productReviewHeading">ALL REVIEWS</h1>

              <div>
                <StarIcon />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                Search
              </Button>
            </form>

            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            ) : (
              <div className="noItemPage" style={{ height: "435px" }}>
                No Reviews
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductReviews;
