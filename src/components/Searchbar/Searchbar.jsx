import React, { Component } from 'react'

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
    <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
            <span className="button-label">Search</span>
            </button>

            <input
                className="input"
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
