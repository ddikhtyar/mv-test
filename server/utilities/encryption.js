var encrypt = require('crypto');

exports.createSalt = function (){
    return encrypt.randomBytes(128).toString('base64');
};

exports.hashPwd = function (salt,pwd){
    var hmac = encrypt.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
};