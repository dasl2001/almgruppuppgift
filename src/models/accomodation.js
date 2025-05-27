const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Accomodation = sequelize.define('Accomodation', {
  address: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  city: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  country: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  zipcode: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  rent: { 
    type: DataTypes.FLOAT,   
    allowNull: false,
    validate: { 
      notNull: { msg: "Hyra måste anges" },      
      isFloat: { msg: "Hyra måste vara ett nummer" }, 
      isNumeric: { msg: "Hyra måste vara numerisk" }, 
      min: 0                                     
    }
  },
  rooms: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: { 
      notNull: { msg: "Antal rum måste anges" },      
      isInt: { msg: "Antal rum måste vara ett heltal" }, 
      min: 1                                          
    }
  }
});
User.hasMany(Accomodation, { 
  foreignKey: { name: 'UserId', allowNull: false }, 
  onDelete: 'CASCADE',
  hooks: true,           
  constraints: true
});
Accomodation.belongsTo(User, { 
  foreignKey: { name: 'UserId', allowNull: false },
  constraints: true
});
module.exports = Accomodation;







