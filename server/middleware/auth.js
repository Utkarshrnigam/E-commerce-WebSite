const admin = require("../firebase/index");
const User = require("../models/user");
exports.authCheck = async (req, res, next) => {
  console.log("auth check middleware", req.headers.idtoken);
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.idtoken);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      error: err,
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const email = req.currentUser.email;
  const user = await User.findOne({ email }).exec();
  if (user.role != "admin")
    res.status(403).json({ err: "Admin Access Denied" });
  else next();
};
