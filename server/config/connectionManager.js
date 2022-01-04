const knex = require('knex');
const { getNamespace } = require('cls-hooked');

const commonDBConnection = require('./db/commonDBConnection');

let tenantsDatasources = {};

exports.connectionAllDatabases = async function () {
    let datasources = [];
    try {
        datasources = await commonDBConnection.select('*').from('data_source_config').where('initialized', true);
        datasources.forEach(datasource => {
            tenantsDatasources[datasource.name] = knex(configConnectionTenant(datasource)).on('query', function(queryData) {
                console.log(queryData.__knexUid + ' -- ' + queryData.__knexQueryUid + '\n' + queryData.sql + '\n' + queryData.bindings);
            });
        });
        console.log('Database connection setup successfully executed');
    } catch (error) {
        console.log('Error: ', error);
        return;
    }
}

const configConnectionTenant = function (datasource) {
    let urlDatabaseSplited = datasource.url.split('/');
    let nameDatabase = urlDatabaseSplited[urlDatabaseSplited.length - 1];
    let hostDatabase = urlDatabaseSplited[urlDatabaseSplited.length - 2].split(':')[0];
    let portDatabase = urlDatabaseSplited[urlDatabaseSplited.length - 2].split(':')[1];
    return {
        client: 'pg',
        connection: {
            host: hostDatabase,
            port: parseInt(portDatabase),
            user: datasource.username,
            password: datasource.password,
            database: nameDatabase
        },
        pool: {min: 2, max: 10}
    }

}

exports.getConnectionByTenant = function (tenantName) {
    if(tenantsDatasources) {
        return tenantsDatasources[tenantName];
    }
}

exports.getConnection = function () {
    const nameSpace = getNamespace('unique context');
    const conn = nameSpace.get('connection');
    if(!conn) throw new Error('Connection is not set for any tenant database.');
    return conn;
}