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
  test('requires all fields', async () => {
    const user = await User.create({
      username: 'requiredfields',
      email: 'fields@test.com',
      profileImage: 'http://img.com/fields.jpg'
    });
    await expect(Accomodation.create({
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '11111',
      rent: 7000,
      rooms: 2,
      UserId: user.id
    })).rejects.toThrow();
    await expect(Accomodation.create({
      address: 'Saknadsgatan 1',
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '11111',
      rent: 7000,
      UserId: user.id
    })).rejects.toThrow();
  });
  test('rent and rooms must be correct type', async () => {
    const user = await User.create({
      username: 'numfields',
      email: 'numfields@test.com',
      profileImage: 'http://img.com/n.jpg'
    });
    await expect(Accomodation.create({
      address: 'Testgatan 1',
      city: 'Teststad',
      country: 'Sverige',
      zipcode: '22222',
      rent: 'notanumber', // Felaktig typ
      rooms: 2,
      UserId: user.id
    })).rejects.toThrow();
    await expect(Accomodation.create({
      address: 'Testgatan 2',
      city: 'Teststad',
      country: 'Sverige',
      zipcode: '22222',
      rent: 7000,
      rooms: 'två', 
      UserId: user.id
    })).rejects.toThrow();
  });
  test('can create multiple accomodations per user', async () => {
    const user = await User.create({
      username: 'multiboende',
      email: 'multi@test.com',
      profileImage: 'http://img.com/m.jpg'
    });
    const accomodation1 = await Accomodation.create({
      address: 'Adress 1',
      city: 'Göteborg',
      country: 'Sverige',
      zipcode: '11111',
      rent: 9000,
      rooms: 2,
      UserId: user.id
    });
    const accomodation2 = await Accomodation.create({
      address: 'Adress 2',
      city: 'Stockholm',
      country: 'Sverige',
      zipcode: '22222',
      rent: 9500,
      rooms: 3,
      UserId: user.id
    });
    const all = await Accomodation.findAll({ where: { UserId: user.id } });
    expect(all.length).toBe(2);
    expect(all[0].address).toBe('Adress 1');
    expect(all[1].address).toBe('Adress 2');
  });
});





