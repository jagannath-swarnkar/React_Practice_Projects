const dotenv = require('dotenv');
var result = dotenv.config();

if (result.error){
    throw result.error
}

const {parsed: envs}=result;
module.exports={
    envdata:envs
}