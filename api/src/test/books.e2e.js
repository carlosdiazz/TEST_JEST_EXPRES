const mockGetAll = jest.fn();
const request = require('supertest');

const createApp = require('../app');
const { generateManyBook } = require('../fakes/book.fake');

jest.mock('../lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for books', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });
  afterAll(async () => {
    await server.close();
  });

  describe('Test for GET /api/v1/books', () => {
    test('return list Books', () => {
      const fakeBooks = generateManyBook(10);
      mockGetAll.mockResolvedValue(fakeBooks);
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toEqual(10);
        });
    });
  });
});
