import React from 'react';
import ReactDOM from 'react-dom';
import TimelinePage from './timeline';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimelinePage />, div);
});
