import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Routes from '../../src/routes';

// Mocking dependencies
jest.mock('@expo/vector-icons', () => ({
  Feather: 'FeatherMock',
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      ...(jest.requireActual('react-native-gesture-handler').GestureHandlerModule || {}),
    },
    GestureHandlerRootView: View,
    gestureHandlerRootHOC: jest.fn(),
  };
});

describe('Routes', () => {
    //rendr home
  it('renders Home tab correctly', () => {
    const { toJSON } = render(<Routes />);
    expect(toJSON()).toMatchSnapshot();
  });

  //render favorite
  it('renders Favorites tab correctly', () => {
    const { getByText } = render(<Routes />);

    //Navigation to Favorites tab
    fireEvent.press(getByText('Favorites'));

    //verify if favorite screen is rendered
    const favoritesHeader = getByText('Favorites');
    expect(favoritesHeader).toBeDefined();
  });
});
