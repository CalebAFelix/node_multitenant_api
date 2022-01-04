const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')

const {connectionAllDatabases} = require('./config/connectionManager');
const connectionResolver = require('./middlewares/connectionResolver');
const {errorHandler} = require('./middlewares/errorHandler');


app.use(express.json());
app.use(basicAuth({
    users: {'admin_user':'*P#t1NH9N>}cGEp&{A(K#]zBkm>UkdrSsU$Lj++x(%{;-g5!ho+LikN);JFamxs<'}
}));
app.use(connectionResolver.resolver);
app.use('/users', require('./route/usersRoute'));
app.use(errorHandler);


app.get('/', (req, res, next) => {
    res.send('Hello multi-tenant application.');
});


connectionAllDatabases();
app.listen(9000);