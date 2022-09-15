// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    const validProject = await Project.get(req.params.id)
    if(!validProject){
        next({ status: 404, message: 'Invalid Project Id'})
    } else {
        next()
    }
}

function validateProjectBody(req, res, next) {
    const {name, description} = req.body;
    if (!description || !name || !("completed" in req.body)) {
        next({ status: 400, message: 'invalid project'})
    } else {
        next()
    }
}

module.exports = {
    validateProjectBody,
    validateProjectId,
}