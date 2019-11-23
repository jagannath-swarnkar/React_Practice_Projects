// creating a pet table

module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define('pet', {
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
      owner_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM,
        values: ['dog', 'cat', 'minx']
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      }
    }, {
      paranoid: true,
      underscored: true
    });
    return Pet;
  };