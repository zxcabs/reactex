/**
 * Created by user on 15.06.14.
 */

var
    React = require('react'),
    DOM = React.DOM;

module.exports = React.createClass({
    getInitialState: function() {
        return { user: this.props.app.user };
    },
    handelClick: function () {
        var
            self = this;

        this.props.app.updateUser()
            .then(function (user) {
                self.setState({ user: user });
            });
    },
    render: function () {
        return DOM.button({ onClick: this.handelClick }, 'Hello: ' + this.props.app.user.name);
    }
});