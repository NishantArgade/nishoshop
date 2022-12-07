const mongoose = require("mongoose");

const connectionDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(
      `Database connect successfuly with server:${data.connection.host}`
    );
  });
};

module.exports = connectionDatabase;
