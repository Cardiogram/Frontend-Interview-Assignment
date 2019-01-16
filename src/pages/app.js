import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TimelinePage from './timeline/timeline';
import MetricsPage from './metrics/metrics';
import CarePage from './care/care';
import HabitsPage from './habits/habits';
import ProfilePage from './profile/profile';

import Navigation from '../components/nav/navigation';
import TIMELINE_ICON from '../components/icons/timeline-icon';
import METRICS_ICON from '../components/icons/metrics-icon';
import CARE_ICON from '../components/icons/care-icon';
import HABITS_ICON from '../components/icons/habits-icon';
import PROFILE_ICON from '../components/icons/profile-icon';

// TODO: Should we use React Router?
const PAGES = {
  timeline: {
    name: 'timeline',
    icon: TIMELINE_ICON,
    link: '/',
    component: TimelinePage,
  },
  metrics: {
    name: 'metrics',
    icon: METRICS_ICON,
    link: '/metrics',
    component: MetricsPage,
  },
  care: {
    name: 'care',
    icon: CARE_ICON,
    link: '/care',
    component: CarePage,
  },
  habits: {
    name: 'habits',
    icon: HABITS_ICON,
    link: '/habits',
    component: HabitsPage,
  },
  profile: {
    name: 'profile',
    icon: PROFILE_ICON,
    link: '/profile',
    component: ProfilePage,
  },
};

const PAGE_NAMES = Object.keys(PAGES);

/**
 * Base App component
 */
class App extends Component {
  renderPage = (pageName) => {
    const page = PAGES[pageName];
    return (
      <Route
        exact
        path={page.link}
        component={page.component}
        key={page.name}
      />
    );
  };

  render() {
    return (
      <Router>
        <section className="app">
          <Switch>{PAGE_NAMES.map(this.renderPage)}</Switch>
          <Navigation pages={PAGES} pageNames={PAGE_NAMES} />
        </section>
      </Router>
    );
  }
}

export default App;
