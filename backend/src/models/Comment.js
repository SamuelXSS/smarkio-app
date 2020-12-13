const { Model, DataTypes } = require('sequelize')

class Comment extends Model {
    static init(sequelize){
        super.init({
            comment: DataTypes.STRING,
            color1: DataTypes.STRING,
            color2: DataTypes.STRING,
            font_color: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Comment