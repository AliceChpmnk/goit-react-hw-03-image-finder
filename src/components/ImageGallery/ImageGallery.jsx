import React, { Component } from 'react';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

export class ImageGallery extends Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired,
        }
    render() {
        const { query, pictures } = this.props;
        return <ul className={css.ImageGallery}>
                {pictures.map(({ id, webformatURL, largeImageURL }) => {
                    return <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} alt={query} />
                    })}
                </ul>
  }
}
