const mongoose = require('mongoose');
const User = require('../models/User');
const Accommodation = require('../models/Accommodation');

describe('Cascade delete', () => {
  it('should delete accommodations when user is removed', async () => {
    const user = await User.create({ name: 'Test User' });

    await Accommodation.create({
      address: 'Storgatan 1',
      city: 'Göteborg',
      country: 'Sverige',
      postalCode: '41101',
      rent: 9000,
      rooms: 2,
      userId: user._id
    });

    await user.remove();

    const results = await Accommodation.find({ userId: user._id });
    expect(results.length).toBe(0);
  });
});

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
