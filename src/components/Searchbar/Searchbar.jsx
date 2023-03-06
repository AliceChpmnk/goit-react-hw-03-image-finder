import React, { Component } from 'react';
import css from '../../styles.module.css';
import IconButton from './IconButton';
import { BsSearchHeart } from 'react-icons/bs';

export default class Searchbar extends Component {
    state = {
        query: '',
    }

    handleQueryChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = e => {
        e.preventDefault();
        
    if (this.state.query.trim() === '') {
      alert('Please enter any word');
      return;
    }

    this.props.onSubmit(this.state.query);

    this.reset();
    };

    reset = () => {
    this.setState({ query: ''});
    };

  render() {
    return (
    <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                <IconButton type="submit"><BsSearchHeart /> </IconButton>

            <input
                className={css.SearchForm_input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleQueryChange}
            />
        </form>
    </header>
    )
  }
}
