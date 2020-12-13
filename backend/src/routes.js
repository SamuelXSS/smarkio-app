const express = require('express')

const CommentController = require('./controllers/CommentController')

const routes = express.Router()

routes.get('/comments', CommentController.index)
routes.post('/comments', CommentController.store)
routes.get('/comments/speak', CommentController.speak)
routes.put('/comments/:comment_id', CommentController.update)
routes.delete('/comments/:comment_id', CommentController.destroy)


module.exports = routes