// Write your "projects" router here!
const express = require('express')
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', async (req,res,next) => {
    try {
        const stuff = await Project.get();
        res.status(200).send(stuff);
      } catch {
        next({
            status: 500,
            message: 'unable to get projects'
        });
      }
})

router.get('/:id', validateProjectId, async (req,res,next) => {
    try {
        const stuff = await Project.get(req.params.id);
        res.status(200).send(stuff)
    } catch {
        next()
    }
})

router.post('/', validateProjectBody, async (req,res,next) => {
    try {
        const stuff = await Project.insert(req.body);
        res.status(200).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to add project'
        })
    }
})

router.put('/:id', [validateProjectId, validateProjectBody], async (req,res,next) => {
    try {
        const stuff = await Project.update(req.params.id, req.body);
        res.status(201).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to update project'
        })
    }
})

router.delete('/:id', validateProjectId, async (req,res,next) => {
    try {
        const stuff = await Project.remove(req.params.id, req.body);
        res.status(201).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to remove project'
        })
    }
})

router.get('/:id/actions', async (req,res,next) => {
    try {
        const stuff = await Project.getProjectActions(req.params.id, req.body);
        res.status(200).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to remove project'
        })
    }
})

router.use((err, req,res,next) => {
    res.status(err.status || 500).json({
        customMessage: 'Error in post router',
        message: err.message,
        stack: err.stack,
    })

})

module.exports = router