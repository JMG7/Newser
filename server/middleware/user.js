const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (error, decodedToken)=> {
            if (error) {
                return res.status(401).json({ message: "Invalid token" });
            }
            if (decodedToken.expiresAt < Date.now()) {
                return res.status(401).json({ message: "Your token has expired" });
            }
            req.userData = {
                userName: decodedToken.userName,
                id: decodedToken.id,
                expiresAt: decodedToken.expiresAt
            };
            next();
      });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    };
};