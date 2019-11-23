// creating owner table

module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('owner', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            auto_increment: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user','admin','disabled']
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
          }
    },{
        paranoid: true,
        underscored: true
    });
    return Owner;
};