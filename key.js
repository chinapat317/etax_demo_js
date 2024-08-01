blueprint = require("crypto");
var jwtSecretkey;

function keyGen(){
    return blueprint.randomBytes(35).toString("hex");
}
module.exports = {keyGen, jwtSecretkey};