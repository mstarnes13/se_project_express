const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

const { login, createUser } = require ("./controllers/users");


mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to db", r);
  },
  (e) => { console.log("db error", e);
}
);

const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port: ${PORT}`);
});
