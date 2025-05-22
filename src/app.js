/*
Importerar moduler
*/
const express = require('express');
const sequelize = require('./db.js');
require('./models/user.js');
require('./models/accomodation.js');

/*
Skapar Express-appen
*/
const app = express();

/*
Kan tolka JSON i inkommande requests (req.body)
*/
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the group of David Slivo and Kalle Soderberg'));

/*
Skapar tabellerna i databasen om de inte redan finns
*/
sequelize.sync(); 

/*
Exporterar appen
*/
module.exports = app;

/*
Om filen körs direkt (inte importeras) så startas en server på port 3000
*/
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

/*
Kommando för docker:
docker build -t alm-app .
>> docker run -p 3000:3000 alm-app
*/