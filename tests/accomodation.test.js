const sequelize = require('../src/db');
const User = require('../src/models/user');
const Accomodation = require('../src/models/accomodation');

// Nollställer databasen före alla tester
beforeAll(async () => { await sequelize.sync({ force: true }); });

describe('Accomodation model', () => {
  test('cascade delete accomodation when user deleted', async () => {
    // Skapa användare
    const user = await User.create({ 
      username: 'cascade', 
      email: 'cascade@test.com', 
      profileImage: 'http://img.com/c.jpg' 
    });

    // Skapa boende kopplat till användaren
    const accomodation = await Accomodation.create({
      address: 'Cascadegatan 2',
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '22233',
      rent: 8000,
      rooms: 2,
      UserId: user.id // Kopplar ihop boendet med användaren
    });

    // Ta bort användaren (ska radera boendet automatiskt)
    await user.destroy();

    // Kontrollera att boendet är borta
    const found = await Accomodation.findByPk(accomodation.id);
    expect(found).toBeNull();
  });
});

