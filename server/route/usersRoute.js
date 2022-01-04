const express = require('express');
const router = express.Router();

const usersService = require('../service/usersService');

router.get('', async function (req, res, next){
    const users = await usersService.findAll();
    res.json(users);
});

router.get('/:id', async function (req, res, next){
    const user = await usersService.find(req.params.id);
    res.json(user);
});

module.exports = router;