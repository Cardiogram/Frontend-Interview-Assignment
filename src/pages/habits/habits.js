import React from 'react';
import './habits.css';

import mock from './mocks/discover.png';

function HabitsPage() {
  return (
    <section className="habits">
      <img src={mock} alt="" />
    </section>
  );
}

export default HabitsPage;