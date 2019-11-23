module.exports = (Sequelize, sequelize) => {

    const files = sequelize.define('files', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        todo_id: {
            type: Sequelize.INTEGER,
            allowNull: false
            
        },
        file: {
            type: Sequelize.STRING,
        }
    },{
        paranoid: true,
        underscored: true
    });
    return files;
}