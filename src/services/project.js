const pool = require('./db')
const { getDateTime } = require('../utils/time')

const getRetrieve = async (id) => {
    const sqlQuery = 'SELECT * FROM project WHERE id=?'
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta

    return rows
}

const getList = async () => {
    const sqlQuery = 'SELECT * FROM project' 
    const rows = await pool.query(sqlQuery)
    delete rows.meta

    return rows
}

const filter = async ({ code }) => {
    const sqlQuery = 'SELECT * FROM project WHERE code LIKE %?%'
    let rows = await pool.query(sqlQuery, code)
    delete rows.meta

    return rows
}

const create = async ({ code, name, startAt, endAt }) => {
    let datetime = getDateTime() + '.0000'

    let sqlQuery = `INSERT INTO project(
            code,
            name,
            startAt,
            endAt,
            createAt,
            updateAt
        ) VALUES (
            "${code}"
            ,"${name}"
            ,"${startAt}"
            ,"${endAt}"
            ,"${datetime}"
            ,"${datetime}"
        )`

    await pool.query(sqlQuery)
}

module.exports = {
    getRetrieve,
    getList,
    filter,
    create,
}