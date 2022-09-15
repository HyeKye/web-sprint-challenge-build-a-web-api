// add middlewares here related to actions
const Action = require('./actions-model')

async function validateProjectId(req, res, next) {
    const validProject = await Action.get(req.body.project_id)
    if(!validProject){
        next({ status: 404, message: 'invalid project id'})
    } else {
        next()
    }
}

function validateActionBody(req, res, next) {
    const {notes, description, project_id} = req.body;
    if (!description || !notes || !project_id) {
        next({ status: 400, message: 'invalid action'})
    } else {
        next()
    }
}

module.exports = {
    validateActionBody,
    validateProjectId,
}