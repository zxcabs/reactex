/**
 * Created by user on 15.06.14.
 *
 * API for browser
 */

var
    Promise = require('bluebird');

module.exports = Promise.method(function (name, param) {
    if ('get.user' !== name) return Promise.reject(new Error('unknown name: ', name));

    //Example ajax
    return new Promise(function (resolve, reject) {
            var
                xhr = new XMLHttpRequest();

            xhr.addEventListener("error", reject);
            xhr.addEventListener("load", function () {
                return resolve(xhr);
            });

            xhr.open('GET', '/api/get.user');
            xhr.send(null);
        })
        .then(function (xhr) {
            return xhr.responseText;
        })
        .then(function (res) {
            return JSON.parse(res);
        });
});