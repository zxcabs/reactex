/**
 * Created by user on 15.06.14.
 */

var
    PORT = 8000;

var
    express = require('express'),
    React = require('react'),
    viewApp = require('./app/view/app.js'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    App = require('./app/App.js'),
    appServer = express(),
    apiServer = express(),
    api = require('api');

apiServer.use(function (req, res, next) {
    api(req.url.substr(1), req.params)
        .then(function (data) {
            res.json(data);
        })
        .catch(next);
});

appServer.use('/api', apiServer);

appServer.get('/app/App.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');

    browserify()
        .transform(literalify.configure({
            react: 'window.React'
        }))
        .require('./app/App.js', { expose: 'App' })
        .require('./app/api', { expose: 'api' })
        .add('./app/main.js')
        .bundle()
        .pipe(res)
});

appServer.get('/', function (req, res, next) {

    (new App())
        .init()
        .then(function (app) {
            res.setHeader('Content-Type', 'text/html');
            res.end('<!doctype html>' + app.renderToString());
        });

});

appServer.listen(PORT, function (err) {
    if (err) return console.log('error: ', err);
    console.log('start server on: ', PORT);
});

