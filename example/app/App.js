/**
 * Created by user on 15.06.14.
 */

module.exports = App;

var
    api = require('api'),
    Promise = require("bluebird"),
    React = require('react'),
    appView = require('./view/app.js');

function App(state) {
    state = state || {};

    this.state = state || {
        title: 'My app'
    };
}

App.prototype.init = Promise.method(function () {
    var
        self = this;

    self.__init = self.__init || (self.state.user || api('get.user')
        .then(function (user) {
            self.state.user = user;
            return self;
        }));

    return self.__init;
});

App.prototype.updateUser = function () {
    var
        self = this;

    return api('get.user')
        .then(function (user) {
            self.state.user = user;
            return user;
        });
};

App.prototype.render = function (container) {
    var
        self = this;

    this.init()
        .then(function () {
            React.renderComponent(appView({ app: self }), container);
        });
};

App.prototype.renderToString = function () {
    return  React.renderComponentToString(appView({ app: this }));
};