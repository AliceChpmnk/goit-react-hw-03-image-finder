import React, { Component } from 'react';
import {LoadMoreButton} from 'components/Button/Button';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import * as API from 'services/pixabyApi';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
state = {
    pictures: [],
    query: '',
    page: 1,
    error: null,
    status: Status.IDLE,
    }
    
    static propTypes = {
        query: PropTypes.string,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevPage = prevState.page;
        const nextPage = this.state.page;

        // const fetchPictures = async () => {
        // try {
        //     const pictures = await API.getPicturesByName(nextQuery);
        //     this.setState({ pictures: pictures.data.hits });
        //     this.setState({ status: Status.RESOLVED });
        //     } catch (error) { this.setState({ error, status: Status.REJECTED }); }
        //     finally {console.log(this.state.status); console.log(this.state.pictures);}
        // }
        
        if (prevQuery !== nextQuery || prevPage !== nextPage) {
            this.setState({ status: Status.PENDING });
            this.setState({ query: nextQuery });
            // fetchPictures();
            API.getPicturesByName(nextQuery, nextPage)
                .then(pictures => {
                    this.setState({ pictures: [...this.state.pictures, ...pictures], status: Status.RESOLVED })})
                .catch(error => this.setState({ error, status: Status.REJECTED }));
        }
    }
    
    onLoadMoreBtnClick = () => {
        this.setState({ page: this.state.page + 1 });
    }
        
    render() {
        const { pictures, status, query } = this.state;
        
        if (status === 'rejected') {
        return <div>Oooops, something went wrong :( Try reloading the page.</div>;
        }

        if (status === 'pending' || status === 'resolved') {
        return <>
            {pictures.length > 0 &&
                <ul className={css.ImageGallery}>
                {pictures.map(({ id, webformatURL, largeImageURL }) => {
                    return <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} alt={query} />
                    })}
                </ul>}
                {status === 'pending' ? <Loader /> : <LoadMoreButton onClick={this.onLoadMoreBtnClick} /> }
        </>
        }
  }
}
