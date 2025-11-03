// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
    req.user = decoded.id; // store counselor ID from token
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
