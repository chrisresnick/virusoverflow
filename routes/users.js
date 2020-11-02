var express = require('express');
var router = express.Router();
const {db, User} = require('../db/models/')
const {asyncHandler} = require("./utils");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/register", (req, res) =>{
  res.render("register");
})

router.post("/", asyncHandler((req, res) => {

}))

module.exports = router;
//module.exports = {router, restoreUser};
