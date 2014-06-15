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
    api = express();


app.use('/api', api);

app.get('/js/index.js', function (req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
        .transform(literalify.configure({
            react: 'window.React'
        }))
        .require('./js')
        .bundle()
        .pipe(res)
});

app.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.end('<!doctype html>' +
        '<html>' +
            '<head>' +
                '<script src="http://fb.me/react-0.10.0.js"></script>' +
                '<script src="/js/index.js"></script>' +
            '</head>' +
            '<body><div id="content">' + React.renderComponentToString(Site({ name: 'user' })) + '</div></body>' +
        '</html>'
    );
});

api.get('/users', function (req, res, next) {
    res.json([{ name: 'Vadim' }, { name: 'Ivan' }, { name: 'Sergey' }]);
});


app.listen(PORT, function (err) {
    if (err) return console.log('error: ', err);
    console.log('start server on: ', PORT);
});

