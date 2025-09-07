const admin = require('firebase-admin')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // console.log("header: ",authHeader);
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const idToken = authHeader.split('Bearer ')[1];

    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    }catch(err){
        console.error("Error verfying Token ", err)
        return res.status(403).json({ message: 'Unauthorized: Invalid token', error: err.message });
    }
}

module.exports = authMiddleware