const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
async function requireAuth(req, res, next) {
    if(!res.locals.authenticated){
      return res.redirect("/login")
    }
    return next();
  }
module.exports = {asyncHandler, requireAuth};
