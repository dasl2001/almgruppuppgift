/*
Importerar databasen och user-modellen
*/
const sequelize = require('../src/db');
const User = require('../src/models/user');

/*
Rensar databasen innan testerna körs (force: true = tabeller återskapas)
Gör att varje test börjar med en tom databas
*/
beforeAll(async () => { await sequelize.sync({ force: true }); });

/*
Samlar alla tester för User-modellen
*/
describe('User model', () => {

/*
Först skapas en användare med a@test.com
Sen försöker du skapa en annan användare med samma e-post
Eftersom e-post är unik, ska det kasta ett fel → testet förväntar sig det (.rejects.toThrow())
*/  
  test('no duplicate email', async () => {
    await User.create({ username: 'a', email: 'a@test.com', profileImage: 'http://img.com/1.jpg' });
    await expect(User.create({ username: 'b', email: 'a@test.com', profileImage: 'http://img.com/2.jpg' })).rejects.toThrow();
  });

/*
Försöker skapa en användare med ogiltig e-post 
E-postvalidering (isEmail: true) aktiveras och kastar ett fel
*/  
  test('valid email', async () => {
    await expect(User.create({ username: 'c', email: 'bademail', profileImage: 'http://img.com/3.jpg' })).rejects.toThrow();
  });

/*
Två användare försöker ha samma username
Eftersom username också är satt som unik, kastas ett fel
*/  
  test('unique username', async () => {
    await User.create({ username: 'unique', email: 'unique@test.com', profileImage: 'http://img.com/4.jpg' });
    await expect(User.create({ username: 'unique', email: 'diff@test.com', profileImage: 'http://img.com/5.jpg' })).rejects.toThrow();
  });

/*
Felaktigt värde (not-a-url) ska inte accepteras enligt validate: { isUrl: true }
*/  
  test('profileImage is url', async () => {
    await expect(User.create({ username: 'imguser', email: 'imguser@test.com', profileImage: 'not-a-url' })).rejects.toThrow();
  });
});

