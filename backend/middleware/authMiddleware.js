import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    // the header looks like: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    // "Bearer TOKEN".split(" ") -> ["Bearer", "TOKEN"]
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // when create token before: const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // so the payload { id: user._id } is now inside the token.
        // e.g decoded = { id: "userIdHere", iat: 1700000000, exp: 1700086400 }
        // iat = issued at (timestamp), exp = expiration time
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user data
        next(); // here route handlers like app.get("/protected", authMiddleware, (req, res).... runs 
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
    }
    
export default authMiddleware;