module.exports = (Sequelize, sequelize) => {

    const todos = sequelize.define('todos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,          
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        text: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        done: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        assigned_to: {
            type: Sequelize.STRING,
        },
        note: {
            type: Sequelize.STRING
        }
    },{
        paranoid: true,
        underscored: true,
        timestamps: false
    });
    return todos;
}