/**
 * Created by user on 28.06.14.
 */

var App = require('App');
var app = new App(JSON.parse(document.getElementById('appData').dataset.init));

app.render(document);