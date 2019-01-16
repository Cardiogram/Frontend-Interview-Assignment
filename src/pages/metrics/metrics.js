import React from 'react';
import './metrics.css';

import Card from '../../components/card/card';
import comparisonMock from './mocks/comparison.png';

function MetricsPage() {
  return (
    <section className="metrics">
      <Card className="text-left" title="Comparisons">
        <img src={comparisonMock} alt="" />
      </Card>
    </section>
  );
}

export default MetricsPage;
