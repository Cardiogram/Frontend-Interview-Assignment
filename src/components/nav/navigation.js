/**
 * Bottom navigation.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation({ className, pages, pageNames }) {
  return (
    <nav className={`navigation ${className}`}>
      <div className="navigation-container">
        {pageNames.map((key) => {
          const page = pages[key];
          return (
            <NavLink
              className={`navigation-item ${page.name}`}
              to={page.link}
              key={page.name}
              exact
            >
              <span className="icon">{React.createElement(page.icon)}</span>
              <span className="navigation-item-text">{page.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

Navigation.defaultProps = {
  className: '',
  pages: {},
  pageNames: [],
};

Navigation.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object,
  pageNames: PropTypes.array,
};
