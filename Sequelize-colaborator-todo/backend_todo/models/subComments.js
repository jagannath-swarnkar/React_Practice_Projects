module.exports = (Sequelize, sequelize) => {

    const subComments = sequelize.define('subComments', {
        subComment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        todo_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subComment: {
            type: Sequelize.TEXT,
        },
    },{
        paranoid: true,
        underscored: true,
        timestamps: false
    });
    return subComments;
}