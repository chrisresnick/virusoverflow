var express = require('express');
var router = express.Router();
const { db, User, Question } = require('../db/models/');
const { asyncHandler } = require('./utils');


const questionNotFoundError = (id) => {
    const err = new Error(`Question with id of ${id} not found`)
    err.title = "Question not found"
    err.status = 404
    return(err)
}
router.get(
    '/:id(\\d+)',
    asyncHandler(async (req, res, next) => {
        const questionId = parseInt(req.params.id)
        const question = await Question.findByPk(questionId)
        if (question) {
            res.json({ question })
        } else {
            next(questionNotFoundError(questionId))
        }
    })
)

router.post("/", asyncHandler(async (req, res) => {
    const { message } = req.body;
    const question = await Question.create({ message })
    res.status(200).json({ question })
}))

module.exports = router;
