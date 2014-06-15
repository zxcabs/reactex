/**
 * Created by user on 15.06.14.
 */


var
    React = require('react'),
    Site = require('../site'),
    api = require('api');

api.getName(function (err, name) {
    React.renderComponent(Site({ name: name }), document.getElementById('content'));
});