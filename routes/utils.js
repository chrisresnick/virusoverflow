const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
async function requireAuth(req, res, next) {
  if (!res.locals.authenticated) {
    return res.render("login", { errors: ["You need to be logged in to access this resource"] })
  }
  return next();
}
module.exports = { asyncHandler, requireAuth };
