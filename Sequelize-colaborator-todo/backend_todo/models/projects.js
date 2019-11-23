module.exports = (Sequelize, sequelize) => {

    const projects = sequelize.define('projects', {
        project_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: Sequelize.STRING,
            allowNull: false,          
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_name: {
            type: Sequelize.STRING,
        },
        user_email: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        project_date: {
            type: Sequelize.DATE,
        }
    },{
        paranoid: true,
        underscored: true,
        timestamps: false
    });
    return projects;
}