// ✅ isAdmin — checks JWT role directly
// This middleware must be used AFTER protect (authMiddleware)
// protect sets req.user from DB, which includes the role field

exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
