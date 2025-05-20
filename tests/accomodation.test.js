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
