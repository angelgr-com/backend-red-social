const jwt = require('jsonwebtoken');

module.exports = (req) => {
    let loggedUser;
    // Check token validity
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                console.log('Invalid token: ', err);
            } else {
                loggedUser = decoded;
            }
        });
        console.log('loggedUser.user._id: ', loggedUser.user._id);
        console.log('req.params.id: ', req.params.id);
        return (loggedUser.user._id === req.params.id) ||
               (loggedUser.user.nickname === req.params.id);
    }
    // delete this return when auth and isAdmin will be activated again
    // return true;
};