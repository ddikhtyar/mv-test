var mongoose = require('mongoose')
    ,encrypt = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required'},
    lastName: {type:String, required:'{PATH} is required'},
    username: {type:String, required:'{PATH} is required', unique:true },
    salt: {type:String, required:'{PATH} is required'},
    hashed_pwd: {type:String, required:'{PATH} is required'},
    roles:[String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User',userSchema);
function createDefaultUser(){
    User.find({}).exec(function(err,collection){
        if(collection.length===0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'ddikhtyar');
            User.create({firstName:'Dima', lastName:'Dikhtyar', username:'ddikhtyar', salt:salt, hashed_pwd:hash, roles:['admin'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'danilius');
            User.create({firstName:'Danil', lastName:'Dikhtyar', username:'danilius', salt:salt, hashed_pwd:hash, roles:[] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'djella');
            User.create({firstName:'Mila', lastName:'Dikhtyar', username:'djella', salt:salt, hashed_pwd:hash });
        }
    });
};

exports.createDefaultUser = createDefaultUser;