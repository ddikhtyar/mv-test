var User = require('mongoose').model('User')
    ,encrypt = require('../utilities/encryption');

exports.getUsers = function(req,res){
    User.find({}).exec(function(err,collection){
        res.send(collection);
    })
};

exports.createUser = function(req,res, next){
    var userData = req.body;
    if(userData.username===undefined){
        var err = new Error('Form has not all fields data');
        res.status(400);
        return res.send({reason:err.toString()});
    }

    userData.username = userData.username.toLowerCase();
    console.log(userData);
    userData.salt = encrypt.createSalt();

    userData.hashed_pwd = encrypt.hashPwd(userData.salt,userData.password);
    User.create(userData, function(err, user){
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate username!');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user,function(err){
            if(err){return next(err);}
            res.send(user);
        });
    });
};

exports.updateUser = function(req,res){
  var userUpdates = req.body;
    if(req.user._id != userUpdates._id && !req.hasRole('admin')){
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;

    if(userUpdates.password && userUpdates.password.length > 2){
        req.user.sale = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.sale,userUpdates.password);
    }
    req.user.save(function(err){
        if(err){req.status(400); return res.send({reason:err.toString()});}
        res.send(req.user);
    });
};