/**
 * @format
 */

import 'react-native';
import React from 'react';
import {HomePage} from '../HomePage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

fetch = jest.fn(() => Promise.resolve());

it('renders correctly', () => {
  const tree = renderer.create(<HomePage/>).toJSON()
  expect(tree).toMatchSnapshot();
});
