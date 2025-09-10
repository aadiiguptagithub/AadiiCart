import e from 'express';
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET); 
    if (verifyToken.id !== process.env.ADMIN_EMAIL) {   
        return res.status(403).json({ message: 'Forbidden' });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;

    next()  

    
        
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export default adminAuth;