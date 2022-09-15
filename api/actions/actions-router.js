// Write your "actions" router here!
const express = require('express')
const { validateProjectId, validateActionBody } = require('./actions-middlware');

const Action = require('./actions-model');

const router = express.Router();

router.get('/', async (req,res,next) => {
    try {
        const stuff = await Action.get();
        res.status(200).send(stuff);
      } catch {
        next({
            status: 500,
            message: 'unable to get actions'
        });
      }
})

router.get('/:id', validateProjectId, async (req,res,next) => {
    try {
        const stuff = await Action.get(req.params.id);
        if (stuff) {
            res.status(200).send(stuff) 
        } else {
            res.status(404).json({message: 'no action'})
        }
    } catch {
        next()
    }
})

router.post('/', [validateActionBody, validateProjectId], async (req,res,next) => {
    try {
        const stuff = await Action.insert(req.body);
        res.status(200).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to add action'
        })
    }
})

router.put('/:id', [validateActionBody, validateProjectId] , async (req,res,next) => {
    try {
        const stuff = await Action.update(req.params.id, req.body);
        res.status(201).send(stuff)
    } catch {
        next({
            status: 500, 
            message: 'unable to update action'
        })
    }
})

router.delete('/:id', validateProjectId, async (req,res,next) => {
    try {
        const stuff = await Action.remove(req.params.id);
        res.status(201).send(stuff)
    } catch {
        next({
            status: 404, 
            message: 'unable to remove action'
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