const { createNamespace } = require('cls-hooked');

const { getConnectionByTenant } = require('../config/connectionManager');

let nameSpace = createNamespace('unique context');

exports.resolver = function (req, res, next) {
    const tenantName = req.headers.tenant;
    if (!tenantName) {
        res.status(400).send('The "tenant" header is not defined in the request. The "tenant" header is mandatory');
        return;
    }

    const connectionTenant = getConnectionByTenant(tenantName);
    if(!connectionTenant) {
        res.status(400).send('The tenant is not created or is not able to access this application');
        return;
    }

    nameSpace.run(() => {
        nameSpace.set('connection', connectionTenant);
        next();
    });
}