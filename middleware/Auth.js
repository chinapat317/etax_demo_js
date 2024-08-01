const key = require("../key.js");
const jwt = require('jsonwebtoken');

function validate(request){
    let tokenHeaderKey = "gfg_jwt_secret_key";
    try {
        const token = request.header(tokenHeaderKey);
        console.log("token: " + token);
        const verified = jwt.verify(token, key.jwtSecretkey);
        if (verified) {
            return true;
        } else {
            // Access Denied
            return false;
        }
    } catch (error) {
        // Access Denied
        console.log(error.message);
        return false;
    }
};

module.exports = {validate};
