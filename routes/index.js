var express = require('express');
var router = express.Router();
const {asyncHandler} = require("./utils");
const {User} = require("../db/models/index");
const bcrypt = require("bcryptjs");
const session = require('express-session');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });

router.get("/login", (req, res) => {
  res.render("login");
})

router.post('/login', asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({where:{username}});
  if(!user){
    //handle username not found
  }
  if(await bcrypt.compare(password, user.password.toString())){
    req.session.auth = {
      userId: user.id,
    };

  }
  else {
    //handle wrong password
  }

}));

module.exports = router;
