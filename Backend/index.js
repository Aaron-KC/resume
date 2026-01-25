const express = require("express");
require("dotenv").config();
require("./config/connect");
const cors = require("cors");

const app = express();
const authRouter = require("./route/authRoute");
const resumeRouter = require("./route/resumeRoute");
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  })
);

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/resume", resumeRouter);

app.listen(port, () => console.log("SERVER CONNECTED AT PORT " + port));
