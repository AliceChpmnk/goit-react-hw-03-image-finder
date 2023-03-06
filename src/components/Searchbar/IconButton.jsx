import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

const IconButton = ({ children }) => (
  <button className={css.SearchForm_button}>
    {children}
  </button>
);

IconButton.defaultProps = {
  children: null,
};

IconButton.propTypes = {
  children: PropTypes.node,
};

export default IconButton;