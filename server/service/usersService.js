const usersData = require('../data/usersData');

exports.findAll = async function () {
    let users = await usersData.findAll();
    return users;
};

exports.find = async function (id) {
    let user = await usersData.find(id);
    return user;
};