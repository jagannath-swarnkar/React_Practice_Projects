module.exports = (Sequelize, sequelize) => {

    const comments = sequelize.define('comments', {
        comment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        todo_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.TEXT,
        },
    },{
        paranoid: true,
        underscored: true,
        timestamps: false
    });
    return comments;
}