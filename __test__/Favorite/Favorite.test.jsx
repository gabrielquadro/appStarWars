import React from 'react';
import { render } from '@testing-library/react-native';
import Favorite from '../../src/pages/Favorite';
import { NavigationContainer } from '@react-navigation/native';

// Mock AsyncStorage methods
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock AsyncStorage globally
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('FavoriteScreen', () => {
  beforeEach(() => {
    // Clear mock storage before each test
    mockAsyncStorage.clear.mockClear();
  });

  //message for empty
  it('renders empty message when no favorites are present', async () => {
    mockAsyncStorage.getItem.mockReturnValueOnce(Promise.resolve(null));

    const { getByText } = render(
      <NavigationContainer>
        <Favorite />
      </NavigationContainer>
    );
    const emptyMessage = getByText('No characters adding to favorites.'); //message when empty
    expect(emptyMessage).toBeTruthy();
  });

  
});
