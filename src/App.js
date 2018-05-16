import React, { Component } from 'react';
import BulletList from 'react-content-loader'
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);
const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const Loader = () => (
  <BulletList>
    <rect x="0" y="17" rx="4" ry="4" width="300" height="10" />
    <rect x="0" y="40" rx="3" ry="3" width="300" height="10" />
    <rect x="0" y="63" rx="2" ry="2" width="300" height="10" />
    <rect x="0" y="86" rx="1" ry="1" width="300" height="10" />
  </BulletList>
)

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
      <div key={item.objectID} className='table-row'>
        <span style={{ width: largeColumn }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: midColumn }}>
          {item.author}
        </span>
        <span style={{ width: smallColumn }}>
          {item.num_comments}
        </span>
        <span style={{ width: smallColumn }}>
          {item.points}
        </span>
        <span style={{ width: smallColumn }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className='button-inline'
          >
            Dismiss
      </Button>
        </span>
      </div>
    )}
  </div>


const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    {children}<input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type='submit'>
      {children}
    </button>
  </form>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .then(this.setState({ isLoading: false }))
      .catch(error => error);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }
  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ]
    this.setState({ 
      result: {
        hits: updatedHits, 
        page
      }
    });
    console.log(result);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ isLoading: true });
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange(event) {
    this.setState({ 'searchTerm': event.target.value });
  }

  render() {
    const { searchTerm, result, isLoading } = this.state;
    const page = (result && result.page) || 0;
    const tableConditional =
      result &&
      <Table
        list={result.hits}
        onDismiss={this.onDismiss}
      />

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        {isLoading ? <Loader /> : tableConditional}
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchTopStories(searchTerm, page+1)}>
            More Items
          </Button>
        </div>
      </div>
    );
  }
}

export default App;