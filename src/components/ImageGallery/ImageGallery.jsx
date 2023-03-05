import {LoadMoreButton} from 'components/Button/Button';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import * as API from 'services/pixabyApi';

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
        
        if (prevQuery !== nextQuery) {
            this.setState({ status: Status.PENDING });
            this.setState({ query: nextQuery });
            // fetchPictures();
            API.getPicturesByName(nextQuery, this.state.page)
                .then(pictures => {
                    this.setState({ pictures, page: this.state.page + 1, status: Status.RESOLVED })})
                .catch(error => this.setState({ error, status: Status.REJECTED }));
        }

        if (prevPage !== nextPage) {
            console.log(nextPage);
        }
    }
    
    // onLoadMoreBtnClick = () => {
    //     API.getPicturesByName(this.state.query, this.state.page)
    //             .then(pictures => {
    //                 this.setState({ pictures: [this.state.pictures, ...pictures], page: this.state.page + 1 })})
    //             .catch(error => this.setState({ error, status: Status.REJECTED }));
    // }
        
    render() {
        const { pictures, status } = this.state;

        if (status === 'idle') {
        return <div>Enter something to search pictures</div>;
        }

        if (status === 'pending') {
            return <div>Loading...</div>;
        }

        if (status === 'rejected') {
        return <div>Oooops</div>;
        }

        if (status === 'resolved') {
            return (<>
                    <ul>
                        {pictures.map(({ id, webformatURL, largeImageURL }) => {
                        return <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} />
                    })}
                    </ul>
                {/* <LoadMoreButton onClick={this.onLoadMoreBtnClick} /> */}
                </>)
        }
  }
}
