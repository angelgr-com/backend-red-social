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
        return loggedUser.user._id === req.params.id;
    }
    // delete this return when auth and isAdmin will be activated again
    return true;
};