import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from "../../src/pages/Home";

describe('HomeScreen', () => {
    //test for render screen and load data
    it('renders correctly and loads data', async () => {
        const { getByTestId } = render(<HomeScreen />);

        await waitFor(() => {
          expect(getByTestId('loading-indicator')).toBeDefined();
        });
    });

    //api erros
    it('handles API errors gracefully', async () => {
        const mockFetch = jest.spyOn(global, 'fetch');
        mockFetch.mockImplementationOnce(() => Promise.reject('API Error'));
      
        const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
        
        await waitFor(() => {
          const errorText = getByText('Error fetching data');
          expect(errorText).toBeDefined();
        });
      
        //Restore original fetch implementation
        mockFetch.mockRestore();
      });

      //api erros
      it('displays error message when API call fails', async () => {
        const mockFetch = jest.spyOn(global, 'fetch');
        mockFetch.mockImplementationOnce(() => Promise.reject('API Error'));
      
        const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
      
        await waitFor(() => {
          const errorText = getByText('Error fetching data');
          expect(errorText).toBeDefined();
        });
      //Restore original fetch implementation
        mockFetch.mockRestore();
      });
      
});