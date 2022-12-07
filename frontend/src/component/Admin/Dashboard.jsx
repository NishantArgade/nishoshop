import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAdminProducts } from "../../Redux/actions/productAction.js";
import { getAllOrders } from "../../Redux/actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../Redux/actions/userAction.js";

const Dashboard = () => {
  Chart.register(...registerables); // registeration of chart
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.adminProducts);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStockCount = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) outOfStockCount++;
    });


  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49"],
        data: [0, 40000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#485000", "#35014F"],
        data: [outOfStockCount, products.length - outOfStockCount],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Totoal Amount <br /> ₹
              {orders &&
                orders.reduce((acc, order) => acc + order.totalPrice, 0)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p> <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p> <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p> <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
