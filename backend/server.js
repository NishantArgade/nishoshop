const app = require("./app");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Shutting down the server due to Uncaght Exception Error.");
  process.exit(1);
});

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "backend/config/config.env" });
}

const connectionDatabase = require("./config/database");
//Connecting to database
connectionDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandle Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandle Promise Rejection.");

  //Close server and exit from this process
  server.close(() => {
    process.exit(1);
  });
});
