/*
Importerar moduler
*/
const sequelize = require('../src/db');
const User = require('../src/models/user');
const Accomodation = require('../src/models/accomodation');

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

/*
Skapar en använadre
*/
describe('Accomodation model', () => {
  test('cascade delete accomodation when user deleted', async () => {
    const user = await User.create({
      username: 'cascade',
      email: 'cascade@test.com',
      profileImage: 'http://img.com/c.jpg'
    });

/*
Skapar ett boende kopplat till användaren
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
Radera användaren
*/
    await user.destroy();

/*
Kontrollera att boendet också är raderat
*/
    const found = await Accomodation.findByPk(accomodation.id);
    expect(found).toBeNull();
  });

/*
Test 
Alla fält måste anges
*/
  test('requires all fields', async () => {
    const user = await User.create({
      username: 'requiredfields',
      email: 'fields@test.com',
      profileImage: 'http://img.com/fields.jpg'
    });

/*
Address saknas!
*/
    await expect(Accomodation.create({
      city: 'Malmö',
      country: 'Sverige',
      zipcode: '11111',
      rent: 7000,
      rooms: 2,
      UserId: user.id
    })).rejects.toThrow();

/*
Rum saknas
*/
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

//Hyra  måste vara ett nummer
    await expect(Accomodation.create({
      address: 'Testgatan 1',
      city: 'Teststad',
      country: 'Sverige',
      zipcode: '22222',
      rent: 'notanumber', // Felaktig typ
      rooms: 2,
      UserId: user.id
    })).rejects.toThrow();

      //Rum måste vara ett heltal
    await expect(Accomodation.create({
      address: 'Testgatan 2',
      city: 'Teststad',
      country: 'Sverige',
      zipcode: '22222',
      rent: 7000,
      rooms: 'två', // Felaktig typ
      UserId: user.id
    })).rejects.toThrow();
  });

  test('can create multiple accomodations per user', async () => {
    const user = await User.create({
      username: 'multiboende',
      email: 'multi@test.com',
      profileImage: 'http://img.com/m.jpg'
    });

      // Skapa två boenden kopplade till samma användare
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

      // Hämta alla boenden för usern, kontrollera att det är två stycken
    const all = await Accomodation.findAll({ where: { UserId: user.id } });
    expect(all.length).toBe(2);
    expect(all[0].address).toBe('Adress 1');
    expect(all[1].address).toBe('Adress 2');
  });
});





