/**
 * Created by user on 15.06.14.
 */

module.exports = App;

var
    api = require('api'),
    Promise = require("bluebird"),
    React = require('react'),
    appView = require('./view/app.js');

function App(opt) {
    opt = opt || {};

    this.user = opt.user;

    this.init();
}

App.prototype.init = Promise.method(function () {
    var
        self = this;

    self.__init = self.__init || (self.user || api('get.user')
        .then(function (user) {
            self.user = user;
        }));

    return self.__init;
});

App.prototype.getState = Promise.method(function () {
    var
        self = this;

    return this.init()
        .then(function () {
            return {
                user: self.user
            };
        });
});

App.prototype.updateUser = function () {
    var
        self = this;

    return api('get.user')
        .then(function (user) {
            self.user = user;
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