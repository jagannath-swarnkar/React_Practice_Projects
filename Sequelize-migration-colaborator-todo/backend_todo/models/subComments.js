module.exports = (sequelize, DataTypes) => {

    const subComments = sequelize.define('subComments', {
        subComment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        todo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subComment: {
            type: DataTypes.TEXT,
        },
    },{
        paranoid: true,
        underscored: true,
        freezTableName:true,
        timestamps: false
    });
    return subComments;
}