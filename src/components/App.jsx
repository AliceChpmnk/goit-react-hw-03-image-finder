import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from '../styles.module.css';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './Button/Button';
import * as API from 'services/pixabyApi';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const PER_PAGE = 12;

export default class App extends Component {

  state = {
    query: '',
    pictures: [],
    total: 0,
    page: 1,
    error: null,
    islastPage: false,
    status: Status.IDLE,
  }

    static propTypes = {
        query: PropTypes.string,
  }
  
  componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.query;
        const nextQuery = this.state.query;
        const prevPage = prevState.page;
        const nextPage = this.state.page;
    
    if (prevQuery !== nextQuery) {
      this.setState({ pictures: [], page: 1, islastPage: false });
    }
        
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.setState({ query: nextQuery });
      API.getPicturesByName(nextQuery, nextPage)
        .then(pictures => {
          this.setState({ pictures: [...this.state.pictures, ...pictures.hits], total: pictures.totalHits, status: Status.RESOLVED });
          if (nextPage >= pictures.totalHits / PER_PAGE || pictures.totalHits < PER_PAGE) {
            this.setState({ islastPage: true });
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    
  }
  
   onLoadMoreBtnClick = () => {
        this.setState({ page: this.state.page + 1 });
    }

  onSubmit = (query) => {
    this.setState({ query });
  }

  render() {
    const { pictures, total, page, status, query, islastPage } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {status === 'rejected' && <div>Oooops, something went wrong :( Try reloading the page.</div>}
        {(status === 'resolved' && pictures.length === 0) && <div>Sorry, there are no images matching your search query. Please try again.</div>}
        {pictures.length > 0 && <ImageGallery pictures={pictures} query={ query } />}
        {status === 'pending' && <Loader />}
        {(pictures.length > 0 && status !== 'pending' && !islastPage) && <LoadMoreButton onClick={this.onLoadMoreBtnClick} />}
      </div>
    )
  }
}
