const jwt = require("jsonwebtoken");

/**
 * Auth middleware to protect routes and verify admin token
 */
function authMiddleware(req, res, next) {
  let token;

  // 1️⃣ Try to get token from Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Fallback: get token from cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3️⃣ No token found → Unauthorized
  if (!token) {
    return res
      .status(401)
      .json({ isAdmin: false, message: "No token provided" });
  }

  try {
    // 🔑 Make sure JWT_SECRET is loaded
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env!");
      return res
        .status(500)
        .json({ isAdmin: false, message: "Server token error" });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Attach info to req for next handlers
    req.adminId = decoded.id;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res
      .status(401)
      .json({ isAdmin: false, message: "Invalid token" });
  }
}

module.exports = authMiddleware;
