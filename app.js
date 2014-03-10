var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Open database connection.
//
mongoose.connect('mongodb://localhost:27017/test');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// Set up routing.
//
app.get('/users', users.list);
app.get('/users/:id', users.retrieve);
app.post('/users', users.create);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.delete);


// Catch 404 and forwarding to error handler
//
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Error handlers
//

// Development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
		    var status = err.status || 500;
        res.json(status, {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces leaked to user
//
app.use(function(err, req, res, next) {
		var status = err.status || 500;
    res.json(status, {
        message: err.message,
        error: {}
    });
});


module.exports = app;
