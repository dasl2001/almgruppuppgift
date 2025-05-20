const express = require('express');
const sequelize = require('./db');
require('./models/User');
require('./models/accomodation');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API is running!'));

sequelize.sync();

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
