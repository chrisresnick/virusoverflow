var express = require('express');
var router = express.Router();
const {db, User} = require('../db/models/')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// const restoreUser = async(req, res, next) => {
//   if(req.session.auth){
//     const {userId} = req.sesson.auth;
//     try {
//       const user = await User.findByPk(userId);
//       if(user) {
//        res.locals.authenticated = true;
//         res.locals.user = user;
//         next();
//       }
//     } catch(e) {
//      res.locals.authenticated = false;
//       next(err);
//     }
//   } else {
//     res.locals.authenticated = false;
//     next();
//   }
// }

module.exports = router;
//module.exports = {router, restoreUser};
