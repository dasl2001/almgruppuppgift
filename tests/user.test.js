const sequelize = require('../src/db');
const User = require('../src/models/user');
beforeEach(async () => {
  await sequelize.sync({ force: true });
});
describe('User model', () => {
  test('no duplicate email', async () => {
    await User.create({ username: 'a', email: 'a@test.com', profileImage: 'http://img.com/1.jpg' });
    await expect(
      User.create({ username: 'b', email: 'a@test.com', profileImage: 'http://img.com/2.jpg' })
    ).rejects.toThrow();
  });
  test('valid email', async () => {
    await expect(
      User.create({ username: 'c', email: 'bademail', profileImage: 'http://img.com/3.jpg' })
    ).rejects.toThrow();
  });
  test('unique username', async () => {
    await User.create({ username: 'unique', email: 'unique@test.com', profileImage: 'http://img.com/4.jpg' });
    await expect(
      User.create({ username: 'unique', email: 'diff@test.com', profileImage: 'http://img.com/5.jpg' })
    ).rejects.toThrow();
  });
  test('profileImage is url', async () => {
    await expect(
      User.create({ username: 'imguser', email: 'imguser@test.com', profileImage: 'not-a-url' })
    ).rejects.toThrow();
  });
  test('username måste anges', async () => {
    await expect(
      User.create({ email: 'nouser@test.com', profileImage: 'http://img.com/6.jpg' })
    ).rejects.toThrow();
  });
  test('email måste anges', async () => {
    await expect(
      User.create({ username: 'noemail', profileImage: 'http://img.com/7.jpg' })
    ).rejects.toThrow();
  });
  test('kan skapa user utan profileImage', async () => {
    const user = await User.create({ username: 'nopic', email: 'nopic@test.com' });
    expect(user.profileImage == null).toBe(true);
  });
  test('skapa två olika användare fungerar', async () => {
    const a = await User.create({ username: 'user1', email: 'user1@test.com', profileImage: 'http://img.com/1.jpg' });
    const b = await User.create({ username: 'user2', email: 'user2@test.com', profileImage: 'http://img.com/2.jpg' });
    expect(a.id).not.toBe(b.id);
  });
});



