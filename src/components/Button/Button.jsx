import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

export function LoadMoreButton({onClick}) {
  return (
      <button type='button' onClick={onClick} className={css.Button}>
      Load More
    </button>
  )
}

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}