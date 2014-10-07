var express = require('express')
    ,logger = require('morgan')
    ,path = require('path')
    ,errorHandler
    ,mongoose = require('mongoose')
    ,stylus = require('stylus');

/*var favicon = require('serve-favicon');*/
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var bodyParser = require('body-parser');
var app = express();

function compile(str,path){
    return stylus(str).set('filename',path);
}


// development only
if ('development' == app.get('env')) {
    errorHandler = require('errorhandler');
    app.use(logger('dev'));
    app.use(errorHandler());
}


// all environments
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(
    {
        src:__dirname + 'public',
        compile: compile
    }
));
app.use(express.static(path.join(__dirname, 'public')));

//mongoose.connect('mongodb://localhost/multivision');
mongoose.connect('mongodb://jeeames:multivision@ds041140.mongolab.com:41140/miltivision');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error...'));
db.once('open',function(callback){
   console.log('db opened');
});
var messageSchema = mongoose.Schema({message:String});
var Message = mongoose.model('messages',messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
    mongoMessage = messageDoc.message;
    console.log(messageDoc.message);
});


app.get('/partials/:partialPath',function(req,res){
    res.render('partials/' + req.params.partialPath);
});
app.get('*',function(req,res){
    res.render('index',{ mongoMessage: mongoMessage });
});
/*app.get('/', routes.index);
app.get('/users', user.list);*/

var port = 3000;
app.listen(process.env.PORT || port, function(){
    console.log('Express server listening on port ' + app.get('port'));
});


