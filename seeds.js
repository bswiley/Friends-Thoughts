const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const { createUser, updateUser } = require('./controllers/userController');
const { createThought } = require('./controllers/thoughtsController');

mongoose.connect('mongodb://localhost/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.once('open', async () => {
  try {
    console.log('Seeding database...');

    // Create users
    const user1 = await createUser({
      body: {
        username: 'user1',
        email: 'user1@example.com',
      },
    });
    const user2 = await createUser({
      body: {
        username: 'user2',
        email: 'user2@example.com',
      },
    });

    // Create thoughts
    const thought1 = await createThought({
      body: {
        thoughtText: 'Thought 1',
        username: user1.username,
        userId: user1._id,
      },
    });
    const thought2 = await createThought({
      body: {
        thoughtText: 'Thought 2',
        username: user2.username,
        userId: user2._id,
      },
    });

    // Add friends
    await updateUser({
      params: { userId: user1._id },
      body: { friendId: user2._id },
    });
    await updateUser({
      params: { userId: user2._id },
      body: { friendId: user1._id },
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }const mongoose = require('mongoose');
  const { User, Thought } = require('./models');
  const { createUser, updateUser } = require('./controllers/userController');
  const { createThought } = require('./controllers/thoughtsController');
  
  mongoose.connect('mongodb://localhost/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  
  mongoose.connection.once('open', async () => {
    try {
      console.log('Seeding database...');
  
      // Create users
      const user1 = await createUser({
        body: {
          username: 'user1',
          email: 'user1@example.com',
        },
      });
      const user2 = await createUser({
        body: {
          username: 'user2',
          email: 'user2@example.com',
        },
      });
  
      // Create thoughts
      const thought1 = await createThought({
        body: {
          thoughtText: 'Thought 1',
          username: user1.username,
          userId: user1._id,
        },
      });
      const thought2 = await createThought({
        body: {
          thoughtText: 'Thought 2',
          username: user2.username,
          userId: user2._id,
        },
      });
  
      // Add friends
      await updateUser({
        params: { userId: user1._id },
        body: { friendId: user2._id },
      });
      await updateUser({
        params: { userId: user2._id },
        body: { friendId: user1._id },
      });
  
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.disconnect();
    }
  });