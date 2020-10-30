var express = require('express');
var router = express.Router();
const {asyncHandler} = require("./utils");
const {Users} = require("../db/models/index");
const bcryt = require("bcryptjs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post('login', asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  const user = await Users.findOne({where:username});
  if(!user){
    //handle username not found
  }
  if(bcrypt.compare(password, user.password)){
    //issue a toke
  }
  else {
    //handle wrong password
  }

}));

module.exports = router;
