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
async function requireAuth(req, res, next) {
  if(!res.locals.authenticated){
    return res.redirect("/login")
  }
  return next();
}

router.get("/test", requireAuth, (req, res) => {
  res.send("test");
})

router.get("/login", (req, res) => {
  res.render("login");
})

router.post('/logout', (req, res) => {
  delete req.session.auth;
  res.redirect(req.header('Referer'));
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
    res.locals.authenticated = true;
    res.locals.user = user.id;
    res.redirect(req.header('Referer'));

  }
  else {
    //handle wrong password
  }
}));

module.exports = router;
