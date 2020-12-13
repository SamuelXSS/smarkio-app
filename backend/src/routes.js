const express = require('express')

const CommentController = require('./controllers/CommentController')

const routes = express.Router()

routes.get('/comments', CommentController.index)
routes.get('/comment/:comment_id', CommentController.find)
routes.get('/comments/speak', CommentController.speak)
routes.post('/comments', CommentController.store)
routes.put('/comments/:comment_id', CommentController.update)
routes.delete('/comments/:comment_id', CommentController.destroy)


module.exports = routes