const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // 1. Get token from header (Format: Bearer <token>)
    let token = req.header("Authorization");

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Remove "Bearer " prefix if it exists
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        // 2. Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Save user data to request
        req.user = verified;
        
        // 4. Go to the next controller function
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;