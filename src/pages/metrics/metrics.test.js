import React from 'react';
import ReactDOM from 'react-dom';
import MetricsPage from './metrics';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MetricsPage />, div);
});
