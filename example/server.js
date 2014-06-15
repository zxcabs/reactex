/**
 * Created by user on 15.06.14.
 */

var
    PORT = 8000;

var
    express = require('express'),
    React = require('react'),
    Site = require('./site'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    app = express(),
    api = require('api');

app.get('/js/index.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
        .transform(literalify.configure({
            react: 'window.React',
            api: 'window.api'
        }))
        .require('./js')
        .bundle()
        .pipe(res)
});

app.get('/js/api.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
        .require('./api')
        .bundle()
        .pipe(res)
});

app.get('/', function (req, res, next) {
    api.getName(function (err, name) {
        res.setHeader('Content-Type', 'text/html');
        res.end('<!doctype html>' +
                '<html>' +
                '<head>' +
                '<script src="http://fb.me/react-0.10.0.js"></script>' +
                '<script src="/js/api.js"></script>' +
                '<script src="/js/index.js"></script>' +
                '</head>' +
                '<body>' +
                    '<div id="content">' + React.renderComponentToString(Site({ name: name })) + '</div>' +
                    '<script src="/js/api.js"></script>' +
                    '<script src="/js/index.js"></script>' +
                    '<script>' +
                        'window.api = require("./api");' +
                        'require("./js");' +
                    '</script>' +
                '</body>' +
                '</html>'
        );
    });

});


app.listen(PORT, function (err) {
    if (err) return console.log('error: ', err);
    console.log('start server on: ', PORT);
});

