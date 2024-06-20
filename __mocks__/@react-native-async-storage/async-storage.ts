let mockStorage: Record<string, string> = {};

const mockAsyncStorage = {
  setItem: jest.fn((key, value) => {
    return new Promise((resolve, _) => {
      mockStorage[key] = value;
      resolve(null);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve, _) => {
      resolve(mockStorage[key] || null);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve, _) => {
      delete mockStorage[key];
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve, _) => {
      mockStorage = {};
      resolve(null);
    });
  }),
};

export default mockAsyncStorage;