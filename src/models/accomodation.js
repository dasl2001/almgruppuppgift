/*
Importera datatyper från Sequelize och initiera databaskoppling
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

/*
Definierar modellen Accomodation med tydliga valideringar
*/
const Accomodation = sequelize.define('Accomodation', {
  // Adress till boendet (obligatoriskt fält)
  address: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  // Stad där boendet ligger (obligatoriskt fält)
  city: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  // Land (obligatoriskt fält)
  country: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  // Postnummer (obligatoriskt fält)
  zipcode: { 
    type: DataTypes.STRING,  
    allowNull: false 
  },
  // Hyra, måste vara ett numeriskt värde, inte negativt
  rent: { 
    type: DataTypes.FLOAT,   
    allowNull: false,
    validate: { 
      notNull: { msg: "Hyra måste anges" },      // Fältet får inte vara null
      isFloat: { msg: "Hyra måste vara ett nummer" }, // Måste vara flyttal/tal
      isNumeric: { msg: "Hyra måste vara numerisk" }, // Extra säkerhet: måste vara numeriskt värde
      min: 0                                     // Kan inte vara negativt
    }
  },
  // Antal rum, måste vara ett heltal, minst 1
  rooms: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: { 
      notNull: { msg: "Antal rum måste anges" },      // Fältet får inte vara null
      isInt: { msg: "Antal rum måste vara ett heltal" }, // Måste vara heltal
      min: 1                                          // Minsta antal rum: 1
    }
  }
});

/*
Skapar relationen mellan User och Accomodation
- En användare kan ha många boenden
- Om användaren tas bort, tas boenden bort (CASCADE)
*/
// Skapa relationen så att CASCADE fungerar i SQLite:
User.hasMany(Accomodation, { 
  foreignKey: { name: 'UserId', allowNull: false }, 
  onDelete: 'CASCADE',
  hooks: true,           // Krävs för att CASCADE ska funka i SQLite
  constraints: true
});
Accomodation.belongsTo(User, { 
  foreignKey: { name: 'UserId', allowNull: false },
  constraints: true
});


/*
Exporterar modellen 
*/
module.exports = Accomodation;







