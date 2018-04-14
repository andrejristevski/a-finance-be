const User = require('../../models/User');


const signup = (req, res, next) => {
    const userBody = {
        username: req.body.username,
        password: req.body.pass
    }

    User.create(userBody, (err, user) => {
        if (err) {
            return res.status(400).send('some err')
        }
        res.status(200).send(user);
    })
}

module.exports = {
    signup,
}