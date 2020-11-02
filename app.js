const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { sequelize } = require("./db/models");
const { port } = require("./config/index.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//const restoreUser = require("")

const app = express();
const store = new SequelizeStore({
	db: sequelize,
});
app.use(
	session({
		name: "virusoverflow",
		secret: "superSecret",
		store,
		resave: false,
	}),
);
store.sync();
//app.use(restoreUser);

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.get("/home", (req, res) => {
// 	res.render("answer-page", {
// 		title: "something",
// 	});
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});
//app.listen(port, () => console.log(`Listening on ${port}`) )
module.exports = app;
