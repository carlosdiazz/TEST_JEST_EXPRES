const { generateManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');

// const fakeBooks = [
//   {
//     _id: 1,
//     name: 'carlos',
//   },
// ];

const mockGetAll = jest.fn();

// const MongoLibStub = {
//   getAll: spyGetAll,
//   // getAll: () => [...fakeBooks],
//   create: () => {},
// };

jest.mock('../lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test de BooksService', () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('Test for getBooks', () => {
    test('Return list book', async () => {
      const fakebooks = generateManyBook(5);
      mockGetAll.mockResolvedValue(fakebooks);

      const books = await service.getBooks({});

      expect(books.length).toEqual(5);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith('books', {}); // Aqui llamo que llame esta funcion con esto argumentos
    });
  });
});
