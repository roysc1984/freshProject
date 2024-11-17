import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import App from '../src/App';

it('renders correctly', () => {
  render(<App />);
});
