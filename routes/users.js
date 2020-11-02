var express = require('express');
var router = express.Router();
const {db, User} = require('../db/models/')
const {asyncHandler} = require("./utils");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/register", (req, res) =>{
  res.render("register");
})

const registerValid = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password.")
    .isLength(10, 100)
    .withMessage("Password must be at least 10 characters long"),
  check("username")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a Username")
];

router.post("/", registerValid, asyncHandler(async (req, res) => {
  const {username, password, email, password_conf} = req.body
  const validationErrors = validationResult(req);
  const errors = validationErrors.errors.map(error => error.msg)
  if(password != password_conf) errors.push("Password and confirmation must match");
  if(errors.length === 0) {
    try {
      const user = await User.create({username, email, password:await bcrypt.hash(password, 10)});
      req.session.auth = {
        userId: user.id,
      };
      res.locals.authenticated = true;
      res.locals.user = user.id;
      return res.redirect("/");
    } catch(e){
      if(e.name === "SequelizeUniqueConstraintError"){
        return res.render("register", {errors: ["Username and Email must be Unique"]});
      }
    }

  }

  res.render("register", {errors})
}))

module.exports = router;
//module.exports = {router, restoreUser};
