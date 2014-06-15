/**
 * Created by user on 15.06.14.
 */

var
    React = require('react'),
    DOM = React.DOM;

module.exports = React.createClass({
    render: function () {
        return DOM.div(null, 'hello ' + this.props.name);
    }
});