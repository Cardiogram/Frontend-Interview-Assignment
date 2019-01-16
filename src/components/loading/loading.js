/**
 * Shows an animated "loading" icon -- three dots that animate while the
 * user is waiting for something to load or refresh.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './loading.css';

export default function Loading({ className }) {
  return (
    <span className={`loading ${className}`}>
      <span className="bounce1" />
      <span className="bounce2" />
      <span className="bounce3" />
    </span>
  );
}

Loading.defaultProps = {
  className: '',
};

Loading.propTypes = {
  className: PropTypes.string,
};
