const express = require('express');
const sequelize = require('./db.js');
require('./models/user.js');
require('./models/accomodation.js');
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Welcome to the group of David Slivo and Kalle Soderberg'));
sequelize.sync(); 
module.exports = app;
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

