const pool = require('./db')
const { getDateTime } = require('../utils/time')

const getRetrieve = async (id) => {
    const sqlQuery = 'SELECT * FROM purchase_item WHERE id=?'
    const rows = await pool.query(sqlQuery, id)
    delete rows.meta

    return rows
}

const getList = async () => {
    const sqlQuery = 'SELECT * FROM purchase_item'
    const rows = await pool.query(sqlQuery)
    delete rows.meta

    return rows
}

const filter = async ({ purchase_id }) => {
    const sqlQuery = 'SELECT * FROM purchase_item WHERE purchase_id=?'
    let rows = await pool.query(sqlQuery, purchase_id)
    delete rows.meta

    return rows
}

const create = async ({ purchase_id, no, des, qty, unit, price, amount, req, sup, asset }) => {
    let datetime = getDateTime() + '.0000'

    let sqlQuery = `INSERT INTO purchase_item(
            purchase_id,
            no,
            description,
            qty,
            unit,
            price,
            amount,
            required,
            supplier,
            asset_no,
            createAt,
            updateAt
        ) VALUES (
            "${purchase_id}"
            ,"${no}"
            ,"${des}"
            ,"${qty}"
            ,"${unit}"
            ,"${price}"
            ,"${amount}"
            ,"${req}"
            ,"${sup}"
            ,"${asset}"
            ,"${datetime}"
            ,"${datetime}"
        )`

    await pool.query(sqlQuery)
}

module.exports = {
    getRetrieve,
    getList,
    filter,
    create
}