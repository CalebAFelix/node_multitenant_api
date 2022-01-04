const { getConnection } = require('../config/connectionManager');

exports.findAll = function () {
    return getConnection().select('*').from('user');
}

exports.find = function (id) {
    return getConnection().select('*').from('user').where('id', id);
}