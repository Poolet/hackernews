import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Button, SearchButton } from './Buttons';
import Table from './Table';
import { sortBy } from 'lodash';
import { Loader, loaderService } from './Loader';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from './constants';
import PropTypes from 'prop-types';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      sortKey: 'NONE',
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    //Need to do it before setState is called, since it is not triggered using set state. Otherwise, result is that loader bar is rendered based on last state, instead of this state.
    loaderService.show('fetchStoriesLoader');
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  onSort(sortKey) {
    this.setState({ sortKey });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = (results && results[searchKey]) ? results[searchKey].hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ]
    loaderService.hide('fetchStoriesLoader');
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;

    this.setState({
      searchKey: searchTerm
    });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange(event) {
    this.setState({ 'searchTerm': event.target.value });
  }

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    const displayedStories =
      <Table
        list={list}
        onDismiss={this.onDismiss}
      />

    const errorMessage =
      <div>
        Something went wrong.
      </div>

    return (
      <div className="page">
        <div className="interactions">
          <SearchButton value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </SearchButton>
        </div>
        {error ? errorMessage : displayedStories}
        <div className="interactions">
          <Loader name='fetchStoriesLoader'>
            <div>Loading...</div>
          </Loader>
          {
            loaderService.isShowing('fetchStoriesLoader') ||
            < Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More stories
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default App;