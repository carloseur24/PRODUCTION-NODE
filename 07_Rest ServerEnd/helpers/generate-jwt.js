
const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '4h'

        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cant generate Token')
            } else {
                resolve(token);
            }
        })
    })
}
module.exports = {
    generateJwt
}