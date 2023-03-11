import React, { Component } from 'react';
import css from '../../styles.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {

    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={ this.handleBackdropClick }>
          <div className={css.Modal}>
              {this.props.children}
          </div>
      </div>, modalRoot,
    )
  }
}
