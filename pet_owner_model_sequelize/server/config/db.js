const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize('petdb', 'root', 'jagan@jagan',{
    host: 'localhost',
    dialect: 'mysql',
    define:{
        underscored: true
    }
})

// Conncect all the models/tables in teh database to the object,
// so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.owners = require('../models/Owner')(sequelize, Sequelize);
db.pets = require('../models/Pet')(sequelize, Sequelize);

// Relationnnnnnns
db.pets.belongsTo(db.owners);
db.owners.hasMany(db.pets);


module.exports = db;