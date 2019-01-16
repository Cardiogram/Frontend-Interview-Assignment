/**
 * Cardiogram Card.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

export default function Card({ className, title, children }) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
}

Card.defaultProps = {
  title: '',
  className: '',
};

Card.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
