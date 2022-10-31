const project = require('../services/project')

const getList = async (req, res, next) => {
    try {
        return res.json(await project.getList())
    } catch (err) {
        console.error(`Error while getting project `, err.message)
        next(err)
    }
}

const getRetrieve = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) return res.status(400).json({ "detail": "All input is required" });

        let instance = await project.getRetrieve(req.params.id)
        instance = instance[0]

        return res.status(200).json(instance)
    } catch (err) {
        console.error(`Error while getting project `, err.message)
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        // Get user input
        const { code, name, start_datetime, end_datetime } = req.body;

        // Validate user input
        if (!(code && name > 0)) {
            return res.status(400).json({ "detail": "All input is required" });
        }

        await project.create({ code: code, name: name, startAt: start_datetime, endAt: end_datetime })

        return res.json(await project.getList())
    } catch (err) {
        console.error(`Error while create project `, err.message)
        next(err)
    }
}

module.exports = {
    getList,
    create,
    getRetrieve
}