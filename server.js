// server.js
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const path = require("path");
const taskRoute = require("./routes/task.js");
const userRoute = require("./routes/user.js");

const {
  checkForAuthenticationCookie, requireAuth
} = require("./middleware/authentication.js");


app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/todo", requireAuth,taskRoute);
app.use("/user", userRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server listening");
});
