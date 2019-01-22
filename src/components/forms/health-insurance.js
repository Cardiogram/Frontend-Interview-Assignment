import React, { Component } from 'react';

import './forms.css';

class HealthInsuranceForm extends Component {
  state = {
    planName: '',
    memberId: '',
    employer: '',
  };

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit form:');
    console.log(this.state);
  };

  render() {
    const { planName, memberId, employer } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <header className="form-title">
          <h1>Health Insurance</h1>
          <p>
            Cardiogram is working with insurers and employers on programs that
            use your smart watch to keep you healthy.
          </p>
        </header>
        <div className="form-body">
          <div className="form-group form-group-inline">
            <label htmlFor="planName">
              <span className="form-input-title">Plan Name</span>
              <input
                type="text"
                name="planName"
                value={planName}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group form-group-inline">
            <label htmlFor="memberId">
              <span className="form-input-title">Member ID</span>
              <input
                type="text"
                name="memberId"
                value={memberId}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group form-group-inline">
            <label htmlFor="employer">
              <span className="form-input-title">Employer</span>
              <input
                id="employer"
                type="text"
                name="employer"
                value={employer}
                onChange={this.handleChange}
              />
            </label>
          </div>
        </div>
        <footer className="text-center">
          <button type="submit" className="button button-primary">
            Save Insurance Information
          </button>
        </footer>
      </form>
    );
  }
}

export default HealthInsuranceForm;
