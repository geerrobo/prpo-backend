const pool = require('./db')
const { getDateTime } = require('../utils/time')

const getRetrieve = async (id) => {
    const sqlQuery = 'SELECT * FROM users WHERE id=?'
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta

    return rows
}

const getList = async () => {
    const sqlQuery = 'SELECT * FROM users'
    const rows = await pool.query(sqlQuery)
    delete rows.meta

    return rows
}

const filter = async ({ email }) => {
    const sqlQuery = 'SELECT * FROM users WHERE email=?'
    let rows = await pool.query(sqlQuery, email)
    delete rows.meta
    if (rows.length <= 1) {
        if (rows[0] == undefined) return false
        else return rows[0]
    }

    return rows
}

const create = async ({ first_name, last_name, email, password }) => {
    let datetime = getDateTime() + '.0000'

    const sqlQuery = `INSERT INTO users(
        email,
        password,
        firstName,
        lastName,
        createAt,
        updateAt
    ) VALUES (
        "${email}",
        "${password}",
        "${first_name}",
        "${last_name}",
        "${datetime}",
        "${datetime}"
    )`

    await pool.query(sqlQuery)
    const rows = await filter({ email })
    
    return rows
}

module.exports = {
    getRetrieve,
    getList,
    filter,
    create
}