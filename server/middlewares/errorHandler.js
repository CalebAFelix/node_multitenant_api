exports.errorHandler = function (error, req, res, next) {
    if(error.message === 'Post not found') {
        return res.status(404).send(error.message);
    }
    if(error.message === 'User already exists') {
        return res.status(409).send(error.message);
    }
    if(error.message === 'Post already exists') {
        return res.status(409).send(error.message);
    }
    res.status(500).send(error.message);
};