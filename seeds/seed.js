const sequelize = require('../config/connection');
const { User, Pet } = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pet of petData) {
    await Pet.create({
      ...pet,
      // owner_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // petData.forEach( async (pet) => {
  //   await Pet.create({
  //     ...pet,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // })
  process.exit(0);
};

seedDatabase();
