module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false  
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dateJoined: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users'
    });
    // Don't add the timestamp attributes (updatedAt, createdAt).
    // timestamps: false
  // }
    return User; 
  };
