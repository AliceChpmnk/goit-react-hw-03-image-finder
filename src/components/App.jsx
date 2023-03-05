import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {

  state = {
    query: null,
  }

  onSubmit = (query) => {
    this.setState({ query });
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    )
  }
}
