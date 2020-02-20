import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

test('renders app without crashing', () => {
  const app = shallow(<App/>);
  expect(app.length).toBeGreaterThan(0);
});
