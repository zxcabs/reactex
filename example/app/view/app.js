/**
 * Created by user on 15.06.14.
 */

var
    React = require('react'),
    DOM = React.DOM;

module.exports = React.createClass({
    getInitialState: function() {
        return this.props.app.state;
    },
    handelClick: function () {
        var
            self = this;

        this.props.app.updateUser()
            .then(function () {
                self.setState(self.props.app.state);
            });
    },
    render: function () {
        return DOM.html(null,
                DOM.head(null,
                    DOM.title(null, this.props.app.title)
                ),
                DOM.body(null,
                    DOM.button({ onClick: this.handelClick }, 'Hello: ' + this.state.user.name),
                    DOM.script({ src: 'http://fb.me/react-0.10.0.js' }),
                    DOM.script({ id: 'appData', 'data-init': JSON.stringify(this.state) ,src: '/app/App.js' })
                )
            );
    }
});