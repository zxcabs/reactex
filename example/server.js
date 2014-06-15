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
            react: 'window.React',
            api: 'window.api'
        }))
        .require('./app/App.js')
        .bundle()
        .pipe(res)
});

appServer.get('/js/api.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
        .require('./api')
        .bundle()
        .pipe(res)
});

appServer.get('/', function (req, res, next) {

    (new App())
        .getState()
        .then(function (state) {
            res.setHeader('Content-Type', 'text/html');
            res.end('<!doctype html>' +
                '<html>' +
                '<head>' +
                    '<script src="http://fb.me/react-0.10.0.js"></script>' +
                '</head>' +
                '<body>' +
                    '<div id="content">' + React.renderComponentToString(viewApp({ app: state })) + '</div>' +
                    '<script src="/js/api.js"></script>' +
                    '<script src="/app/App.js"></script>' +
                    '<script>' +
                       'window.api = require("./api");' +
                       '(function () {' +
                            'var ' +
                                'App = require("./app/App.js"),' +
                                'app = new App(' + JSON.stringify(state) + ');' +

                            'app.render(document.getElementById("content"));' +
                        '})();' +
                    '</script>' +
                '</body>' +
                '</html>'
            );
        });

});


appServer.listen(PORT, function (err) {
    if (err) return console.log('error: ', err);
    console.log('start server on: ', PORT);
});

