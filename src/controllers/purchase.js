const purchase = require('../services/purchase')
const purchase_item = require('../services/purchase_item')

const getList = async (req, res, next) => {
    try {
        return res.json(await purchase.getList({ status: req.params.status }))
    } catch (err) {
        console.error(`Error while getting purchase `, err.message)
        next(err)
    }
}

const getLast = async (req, res, next) => {
    try {
        return res.json(await purchase.getLast())
    } catch (err) {
        console.error(`Error while getting purchase `, err.message)
        next(err)
    }
}

const getRetrieve = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) return res.status(400).json({ "detail": "All input is required" });

        let instance = await purchase.getRetrieve(req.params.id)
        instance = instance[0]
        let items = await purchase_item.filter({ purchase_id: id })
        instance.items = items

        return res.status(200).json(instance)
    } catch (err) {
        console.error(`Error while getting purchase `, err.message)
        next(err)
    }
}

const approve = async (req, res, next) => {
    try {
        const id = req.body.p_id

        if (!id) return res.status(400).json({ "detail": "All input is required" });

        await purchase.approve(id)

        return res.status(200)
    } catch (err) {
        console.error(`Error while getting purchase `, err.message)
        next(err)
    }
}

const reject = async (req, res, next) => {
    try {
        const id = req.body.p_id

        if (!id) return res.status(400).json({ "detail": "All input is required" });

        await purchase.reject(id)

        return res.status(200)
    } catch (err) {
        console.error(`Error while getting purchase `, err.message)
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        // Get user input
        const { p_code, p_note, p_type, p_sub_type, items } = req.body;

        // Validate user input
        if (!(p_code && items.length > 0)) {
            return res.status(400).json({ "detail": "All input is required" });
        }

        let currentPurchase = null
        await purchase.create({ code: p_code, note: p_note, type: p_type, sub_type: p_sub_type }).then((pur) => {
            currentPurchase = pur
            items.forEach(item => {
                purchase_item.create({
                    purchase_id: currentPurchase.id,
                    no: item.i_no,
                    des: item.i_des,
                    qty: item.i_qty,
                    unit: item.i_unit,
                    price: item.i_price,
                    amount: item.i_amount,
                    req: item.i_req,
                    sup: item.i_sup,
                    asset: item.i_asset
                })
            });
        })

        return res.status(201).json({ id: currentPurchase.id })
    } catch (err) {
        console.error(`Error while create purchase `, err.message)
        next(err)
    }
}

module.exports = {
    getList,
    create,
    getLast,
    getRetrieve,
    approve,
    reject
}