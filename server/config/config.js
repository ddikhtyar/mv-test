var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:{
        rootPath:rootPath
        ,db:'mongodb://localhost/multivision'
        ,port:process.env.PORT || 3000
    },
    production:{
        rootPath:rootPath
        ,db:'mongodb://jeeames:multivision@ds041140.mongolab.com:41140/miltivision'
        ,port:process.env.PORT || 80
    }
}