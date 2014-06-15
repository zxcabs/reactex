/**
 * Created by user on 15.06.14.
 *
 * API for server
 */

var
    Promise = require('bluebird'),
    count = 0;

module.exports = Promise.method(function (name, param) {
    if ('get.user' !== name) return Promise.reject(new Error('unknown name: ', name));

    return { name: 'Putin V.V. ' + (count++)};
});