import React, { Component } from 'react';
import './habits.css';

import mock from './mocks/discover.png';

const HABITS = [
  {
    category: 'fitness',
    name: 'Daily bike ride',
    participants: '21734',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/bike.png',
  },
  {
    category: 'fitness',
    name: 'Daily run',
    participants: '36532',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/run.png',
  },
  {
    category: 'fitness',
    name: 'Daily swim',
    participants: '2565',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/swim.png',
  },

  // Sleep.
  {
    category: 'sleep',
    name: 'No coffee after 2 pm',
    participants: '59244',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/coffee.png',
  },
  {
    category: 'sleep',
    name: 'No blue light before sleep',
    participants: '51936',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/blue-light.png',
  },
  {
    category: 'sleep',
    name: '7 hours of sleep',
    participants: '47803',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/sleep.png',
  },

  // Stress.
  {
    category: 'stress',
    name: 'Meditation',
    participants: '66242',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/meditation.png',
  },
  {
    category: 'stress',
    name: 'Yoga',
    participants: '11502',
    thumbnail: 'https://s3.amazonaws.com/cardiogram-app/habits/yoga.png',
  },
];

class HabitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: HABITS,
    };
  }

  render() {
    return (
      <section className="habits-page">
        <img src={mock} alt="" />
      </section>
    );
  }
}

export default HabitsPage;
