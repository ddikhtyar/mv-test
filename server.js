var express = require('express')
    ,path = require('path')
    ,errorHandler;


/*var favicon = require('serve-favicon');*/
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config= require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();


// development only
if ('development' == app.get('env')) {
    errorHandler = require('errorhandler');
    app.use(errorHandler());
}

require('./server/config/routes')(app);

app.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});


