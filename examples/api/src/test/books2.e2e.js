const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../app');
const { config } = require('../config/index');

describe('Test for books', () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(config.dbName);
  });
  afterAll(async () => {
    await server.close();
    await database.collection('books').drop();
  });

  describe('Test for GET /api/v1/books', () => {
    test('return list Books', async () => {
      const seedData = await database.collection('books').insertMany([
        { name: 'Jose' },
      ]);
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
