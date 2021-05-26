const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const app = express();

// const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(body_parser.json());

// app.use("/check", (req, res, next) => {
//   res.json({
//     flag: "succesfull",
//   });
// });

fs.readdirSync("./routes").map((r) => app.use(require("./routes/" + r)));

const port = process.env.PORT || 8000;

app.listen(port, () => "listning on 8000");
