import React, { Component } from 'react';
import Cardiogram from '../models/cardiogram';
import BarChart from '../components/chart/bar-chart';
import './app.css';

// Urls to fetch dummy cardiograms from:
const CARDIOGRAM_URLS = [
  { url: 'data/fzcy58.json' },
  { url: 'data/ilrs66.json' },
  { url: 'data/m68mee.json' },
  { url: 'data/hyef26.json' },
  { url: 'data/u4nyvl.json' },
  { url: 'data/8f7nc7.json' }
];

// For a more accurate API of Cardiogram, you can use:
// https://cardiogram-dev.herokuapp.com/heart/cardiograms/preview/cardiograms/%7B%22_terms%22%3A%5B%7B%22type%22%3A%22CARDIOGRAM_TYPES%22%2C%22value%22%3A%5B%22WORKOUT%22%2C%22DAILY_SUMMARY%22%2C%22DIALOG%22%2C%22WEEK_IN_REVIEW%22%5D%7D%5D%2C%22limit%22%3A2%2C%22offset%22%3A0%2C%22orderBy%22%3A%22start%22%2C%22ascOrDesc%22%3A%22DESC%22%7D?_=1521175601757
// This response preview response data will also return segments.

/**
 * Base App component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardiograms: []
    };
  }

  componentDidMount() {
    Promise.all(CARDIOGRAM_URLS.map((c) => this.fetchData(c)))
      .then((cardiograms) => {
        this.setState({ isLoading: false, cardiograms });
      });
  }

  fetchData(c) {
    return fetch(c.url).then((response) =>
      response.json().then((data) => new Cardiogram(data.cardiogram))
    );
  }

  render() {
    return (
      <section className="app">
        {this.state.isLoading && 'Loading...'}
        {
          !this.state.isLoading && this.state.cardiograms.map((c) =>
            <div key={c.title} className="cardiogram">
              <h3 className="cardiogram-title">{c.title}</h3>
              <BarChart cardiogram={c} />
            </div>
          )
        }
      </section>
    );
  }
}

export default App;
