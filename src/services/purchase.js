const pool = require('./db')
const { getDateTime } = require('../utils/time')

const getRetrieve = async (id) => {
    const sqlQuery = 'SELECT * FROM purchase WHERE id=?'
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta

    return rows
}

const approve = async (id) => {
    let sqlQuery = 'SELECT * FROM purchase WHERE id=?'
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta
    let instance = rows[0]

    let newStatus
    let oldStatus = instance.status
    oldStatus = Number(oldStatus)
    newStatus = oldStatus + 1
    newStatus = '0' + String(newStatus)
    sqlQuery = `UPDATE purchase SET status="${newStatus}" WHERE id=?`
    await pool.query(sqlQuery, id)

    return rows
}

const reject = async (id) => {
    let sqlQuery = `UPDATE purchase SET status="00" WHERE id=?`
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta
}

const getList = async ({ status }) => {
    const sqlQuery = 'SELECT * FROM purchase WHERE status=? ORDER BY ID DESC' 
    const rows = await pool.query(sqlQuery, status)
    delete rows.meta

    return rows
}

const getLast = async () => {
    const sqlQuery = 'SELECT * FROM purchase ORDER BY ID DESC LIMIT 1'
    const rows = await pool.query(sqlQuery)
    delete rows.meta

    return rows
}

const filter = async ({ title }) => {
    const sqlQuery = 'SELECT * FROM purchase WHERE code LIKE %?%'
    let rows = await pool.query(sqlQuery, title)
    delete rows.meta

    return rows
}

const create = async ({ code, note, type, sub_type }) => {
    let datetime = getDateTime() + '.0000'

    let sqlQuery = `INSERT INTO purchase(
            code,
            note,
            status,
            type,
            sub_type,
            createAt,
            updateAt
        ) VALUES (
            "${code}"
            ,"${note}"
            ,"${"01"}"
            ,"${type}"
            ,"${sub_type}"
            ,"${datetime}"
            ,"${datetime}"
        )`

    await pool.query(sqlQuery)


    sqlQuery = `SELECT * FROM purchase WHERE code LIKE "%${code}%" ORDER BY ID DESC LIMIT 1`
    let rows = await pool.query(sqlQuery)
    delete rows.meta

    if (rows[0] == undefined) return false
    else return rows[0]
}

module.exports = {
    getRetrieve,
    getList,
    filter,
    create,
    getLast,
    approve,
    reject
}