const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig)

const Comment = require('../models/Comment')

Comment.init(connection)