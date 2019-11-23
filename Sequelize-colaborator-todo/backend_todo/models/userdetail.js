module.exports = (Sequelize, sequelize) => {

    const userdetail = sequelize.define('userdetail', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            required: true,
            
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
          }
    },{
        paranoid: true,
        underscored: true
    });
    return userdetail;
}