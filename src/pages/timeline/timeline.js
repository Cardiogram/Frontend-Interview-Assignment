import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import Cardiogram from '../../models/cardiogram';
import BarChart from '../../components/chart/bar-chart';
import Loading from '../../components/loading/loading';
import Card from '../../components/card/card';
import './timeline.css';

// Urls to fetch dummy cardiograms from:
const CARDIOGRAM_URLS = [
  'http://localhost:3000/data/fzcy58.json',
  'http://localhost:3000/data/ilrs66.json',
  'http://localhost:3000/data/m68mee.json',
  'http://localhost:3000/data/hyef26.json',
  'http://localhost:3000/data/u4nyvl.json',
  'http://localhost:3000/data/8f7nc7.json',
  'http://localhost:3000/data/tcy39xm2.json',
  'http://localhost:3000/data/preview.json',
];

// For a more accurate API of Cardiogram, you can use the DEMO_URL.
// This response preview response data will also return segments.
// const DEMO_URL = 'http://localhost:3000/data/preview.json';

function fetchCardiograms(url) {
  return fetch(url).then((response) =>
    response
      .json()
      .then((data) =>
        Array.isArray(data.cardiograms)
          ? data.cardiograms.map((c) => new Cardiogram(c))
          : new Cardiogram(data.cardiogram),
      ),
  );
}

/**
 * Base App component
 */
class TimelinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardiograms: [],
    };
  }

  componentDidMount() {
    // Fetch from local.
    Promise.all(CARDIOGRAM_URLS.map((url) => fetchCardiograms(url))).then(
      (cardiograms) => {
        this.setState({ isLoading: false, cardiograms });
      },
    );

    // Fetch from demo url.
    // fetchCardiograms(DEMO_URL).then((cardiograms) => {
    //   this.setState({ isLoading: false, cardiograms });
    // });
  }

  render() {
    const { isLoading, cardiograms } = this.state;
    return (
      <section className="timeline-page">
        {isLoading && <Loading />}
        {!isLoading &&
          cardiograms.map((c) => (
            <Card title={c.title} key={c.uuid}>
              <BarChart cardiogram={c} />
            </Card>
          ))}
      </section>
    );
  }
}

export default TimelinePage;
