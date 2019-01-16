import React from 'react';
import ReactDOM from 'react-dom';
import CarePage from './care';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CarePage />, div);
});
