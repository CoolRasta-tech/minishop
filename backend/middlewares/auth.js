const jwt = require('jsonwebtoken');

function protect(req, res, next){
    let token = null;
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    } else if(req.query.token){
        token = req.query.token;
    }

    if(!token){
        return res.status(401).json({message: 'Unauthorization: token mancante'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id, role: decoded.role};
        next();
    } catch(error){
        return res.status(401).json({message: 'Unauthorization: token non valido'});
    }
};

module.exports = protect;