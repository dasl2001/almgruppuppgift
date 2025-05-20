const sequelize = require('../src/db');
const User = require('../src/models/user');
const Accomodation = require('../src/models/accomodation');

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

describe('Accomodation model', () => {
  test('cascade delete accomodation when user deleted', async () => {
    const user = await User.create({ 
      username: 'cascade', 
      email: 'cascade@test.com', 
      profileImage: 'http://img.com/c.jpg' 
    });

    const accomodation = await Accomodation.create({
      address: 'Cascadegatan 2',
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '22233',
      rent: 8000,
      rooms: 2,
      UserId: user.id
    });

    await user.destroy();
    const found = await Accomodation.findByPk(accomodation.id);
    expect(found).toBeNull();
  });
});



