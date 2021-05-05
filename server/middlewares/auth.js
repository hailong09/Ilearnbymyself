const jwt = require('jsonwebtoken');

// Authorizatin header form : "Authorization: Bearer token"
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).json({success: false, message: 'Acess token not found'})
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({success: false, message: 'Invalid token'})
    }
}

module.exports = verifyToken;