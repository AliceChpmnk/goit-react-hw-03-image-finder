import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';
import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
    }

    static propTypes = {
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { isModalOpen } = this.state;
    return (
        <li className={css.ImageGalleryItem}>
            <img src={this.props.webformatURL} alt={this.props.alt} className={css.ImageGalleryItem_image} onClick={this.openModal}/>
            {isModalOpen && <Modal onClose={this.closeModal}><img src={ this.props.largeImageURL } alt={this.props.alt} /></Modal>}
        </li>
    )
  }
}
