const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/card");

app.use(mainRoutes);
app.use("/card", cardRoutes);
app.use("/static", express.static("public"));

app.use((req, res, next) => {
  console.log("World");
  next();
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(3000, () => {
  console.log("Server online!");
});
