import React, { Component } from 'react';
import Cardiogram from '../models/cardiogram';
import BarChart from '../components/chart/bar-chart';
import './app.css';

// Urls to fetch cardiograms from
const CARDIOGRAM_URLS = [
  { url: 'data/fzcy58.json' },
  { url: 'data/ilrs66.json' },
  { url: 'data/m68mee.json' },
  { url: 'data/hyef26.json' },
  { url: 'data/u4nyvl.json' },
  { url: 'data/8f7nc7.json' }
];

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
          !this.state.isLoading && this.state.cardiograms.map((c, i) =>
            <div key={i} className="cardiogram">
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
