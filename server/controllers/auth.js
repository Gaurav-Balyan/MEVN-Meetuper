const passport = require("passport");

// Uncomment to use Passport Authentication
// exports.onlyAuthUser = function(req, res, next) {
//   if (req.isAuthenticated) {
//     return next();
//   }

//   return res.status(401).send({ errors: { auth: "Not Authenticated" } });
// };

exports.onlyAuthUser = passport.authenticate("jwt", { session: false });
