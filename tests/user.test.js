/*
Importerar moduler
*/
const sequelize = require('../src/db');
const User = require('../src/models/user');

// Körs innan varje test
// Återställer databasen 
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

describe('User model', () => {
/*
Testar att två användare inte kan ha samma e-postadress
Andra försöket ska kasta fel.
*/
  test('no duplicate email', async () => {
    await User.create({ username: 'a', email: 'a@test.com', profileImage: 'http://img.com/1.jpg' });
    await expect(
      User.create({ username: 'b', email: 'a@test.com', profileImage: 'http://img.com/2.jpg' })
    ).rejects.toThrow();
  });

  // Testar att det krävs en korrekt e-postadress, annars kastas fel.
  test('valid email', async () => {
    await expect(
      User.create({ username: 'c', email: 'bademail', profileImage: 'http://img.com/3.jpg' })
    ).rejects.toThrow();
  });

  // Testar att användarnamn måste vara unikt. Om två försöker få samma, kastas fel.
  test('unique username', async () => {
    await User.create({ username: 'unique', email: 'unique@test.com', profileImage: 'http://img.com/4.jpg' });
    await expect(
      User.create({ username: 'unique', email: 'diff@test.com', profileImage: 'http://img.com/5.jpg' })
    ).rejects.toThrow();
  });

  // Testar att profileImage måste vara en giltig URL. Fel format ger felmeddelande
  test('profileImage is url', async () => {
    await expect(
      User.create({ username: 'imguser', email: 'imguser@test.com', profileImage: 'not-a-url' })
    ).rejects.toThrow();
  });

  // Testar att användarnamn är obligatoriskt. Saknas det ska det bli fel.
  test('username måste anges', async () => {
    await expect(
      User.create({ email: 'nouser@test.com', profileImage: 'http://img.com/6.jpg' })
    ).rejects.toThrow();
  });

  // Testar att e-postadress är obligatorisk. Saknas det ska det bli fel.
  test('email måste anges', async () => {
    await expect(
      User.create({ username: 'noemail', profileImage: 'http://img.com/7.jpg' })
    ).rejects.toThrow();
  });

  // Testar att det går att skapa en användare utan profileImage (det blir då null).
  test('kan skapa user utan profileImage', async () => {
    const user = await User.create({ username: 'nopic', email: 'nopic@test.com' });
    expect(user.profileImage == null).toBe(true);
  });

  // Testar att man kan skapa flera olika användare utan problem om de har unika fält.
  test('skapa två olika användare fungerar', async () => {
    const a = await User.create({ username: 'user1', email: 'user1@test.com', profileImage: 'http://img.com/1.jpg' });
    const b = await User.create({ username: 'user2', email: 'user2@test.com', profileImage: 'http://img.com/2.jpg' });
    expect(a.id).not.toBe(b.id);
  });
});



