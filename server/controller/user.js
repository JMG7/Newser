const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                userName: req.body.userName,
                name: req.body.name,
                password: hash
            });
            user.save()
                .then(result => {
                    return res.status(201).json({
                        message: "User created!",
                        result: {
                            id: result._id,
                            userName: result.userName
                        }
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: 'Error creating user!',
                        error: error
                    });
                });
        })
        .catch( error => {
            return res.status(500).json({
                message: 'Error creating user!',
                error: error
            });
        });
}

exports.loginUser = (req, res, next) => {
    let fetchedUser;
    User.findOne({ "userName": req.body.userName })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            }
        })
        .then(result => {
            if (res.finished) {return}
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            
            let expiresAt = Date.now() + process.env.JWT_EXPIRATION*1000; 
            const token = jwt.sign(
                {
                    userName: fetchedUser.userName,
                    id: fetchedUser._id,
                    expiresAt: expiresAt
                },
                process.env.JWT_KEY
            );

            return res.status(200).json({
                id: fetchedUser._id,
                token: token,
                expiresAt: expiresAt
            });
        })
        .catch(error => {
            return res.status(401).json({
                error: error
            });
        });
};