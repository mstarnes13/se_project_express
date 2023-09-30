const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const routes = require("./routes");

const { PORT = 3001 } = process.env;

mongoose.connect(
  "mongodb://localhost:27017/wtwr_db",
  (r) => {
    console.log("connected to db", r);
  },
  (e) => {
    console.log("db error", e);
  },
);

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port: ${PORT}`);
});
