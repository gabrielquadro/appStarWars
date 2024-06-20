import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Details from "../../src/pages/Details";

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
  }));
  
  // Mock fetch method
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

describe('DetailScreen', () => {
    //type character
    const character = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'http://example.com/planets/1',
        films: ['http://example.com/films/1'],
        species: ['http://example.com/species/1'],
        vehicles: ['http://example.com/vehicles/1'],
        starships: ['http://example.com/starships/1'],
        url: 'http://example.com/characters/1',
      };
    
      it('renders loading indicator initially', () => {
        const { getByTestId } = render(<Details route={{ params: { character } }} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
      });

      //load data after loading
      it('renders character details after loading', async () => {
        fetch.mockImplementationOnce(() =>
          Promise.resolve({
            json: () => Promise.resolve({ name: 'Tatooine' }),
          })
        );
    
        const { getByText, queryByTestId } = render(<Details route={{ params: { character } }} />);
    
        await waitFor(() => {
          expect(queryByTestId('loading-indicator')).toBeNull();
          expect(getByText('Luke Skywalker')).toBeTruthy();
          expect(getByText('Height: 172')).toBeTruthy();
          expect(getByText('Mass: 77')).toBeTruthy();
          expect(getByText('Hair color: blond')).toBeTruthy();
        });
      });

});