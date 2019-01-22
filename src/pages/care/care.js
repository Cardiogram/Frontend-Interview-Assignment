import React from 'react';
import './care.css';

import Card from '../../components/card/card';
import HealthInsuranceForm from '../../components/forms/health-insurance';

function CarePage() {
  return (
    <section className="care-page">
      <div className="care-container">
        <Card className="care-card">
          <HealthInsuranceForm />
        </Card>
      </div>
    </section>
  );
}

export default CarePage;
