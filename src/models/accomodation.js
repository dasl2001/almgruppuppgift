const sequelize = require('../src/db');
const User = require('../src/models/user');
const Accomodation = require('../src/models/accomodation');

beforeAll(async () => { await sequelize.sync({ force: true }); });

describe('Accomodation model', () => {
  test('cascade delete accomodation when user deleted', async () => {

/*
Skapar användare
*/
    const user = await User.create({ username: 'cascade', email: 'cascade@test.com', profileImage: 'http://img.com/c.jpg' });

/*    
Skapar boende kopplat till användaren
*/    
    const accomodation = await Accomodation.create({
      address: 'Cascadegatan 2',
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '22233',
      rent: 8000,
      rooms: 2,
      UserId: user.id 
    });

/*    
Ta bort användaren 
*/    
    await user.destroy();

/*
Kolla att boendet är borta
*/
    const found = await Accomodation.findByPk(accomodation.id);
    expect(found).toBeNull();
  });
});


