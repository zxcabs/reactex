/**
 * Created by user on 15.06.14.
 */


var
    React = require('react'),
    Site = require('../site');

React.renderComponent(Site({ name: 'user' }), document.getElementById('content'));