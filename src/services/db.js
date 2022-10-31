const mariadb = require('mariadb')
const dbConfig = require('../configs/db')
const pool = mariadb.createPool(dbConfig)

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err.code);
    }

    if(connection) connection.release();

    return
})

module.exports = pool