var express = require('express');
var router = express.Router();
const { asyncHandler } = require("./utils");
const { User } = require("../db/models/index");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const { check, validationResult } = require("express-validator");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });
async function requireAuth(req, res, next) {
  if (!res.locals.authenticated) {
    return res.redirect("/login")
  }
  return next();
}

router.get("/test", requireAuth, asyncHandler(async (req, res) => {
  res.send(res.locals.user.username);
}))

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/questions", (req, res) => {
  res.render("questions");
})

router.post('/logout', (req, res) => {
  delete req.session.auth;
  res.redirect(req.header('Referer'));
})

const loginValidator = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")]

router.post('/login', loginValidator, asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.render("login", { errors: validationErrors.errors.map(err => err.msg) });
  }
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.render("login", { errors: ["Username and Password Combination not valid"] })
  }
  if (await bcrypt.compare(password, user.password.toString())) {
    req.session.auth = {
      userId: user.id,
    };
    res.locals.authenticated = true;
    res.locals.user = user.id;
    res.redirect(req.header('Referer'));

  }
  else {
    return res.render("/login", { errors: ["Username and Password Combination not valid"] })
  }
}));

module.exports = router;
