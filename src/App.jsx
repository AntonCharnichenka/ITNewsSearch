// import * as React from 'react';
// import axios from 'axios';

// const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// const storiesReducer = (state, action) => {
//   switch (action.type) {
//     case 'STORIES_FETCH_INIT':
//       return { ...state, isLoading: true, isError: false };
//     case 'STORIES_FETCH_SUCCESS':
//       return { ...state, isLoading: false, isError: false, data: action.payload };
//     case 'STORIES_FETCH_FAILURE':
//       return { ...state, isLoading: false, isError: true };
//     case 'REMOVE_STORY':
//       return { ...state, data: state.data.filter((story) => story.objectID !== action.payload.objectID) };
//     default:
//       throw new Error();
//   }
// };

// const useStorageState = (key, initialState) => {
//   const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
//   React.useEffect(
//     () => localStorage.setItem(key, value),
//     [key, value]
//   );
//   return [value, setValue];
// };

// const App = () => {
//   const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
//   const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)
//   console.log('url is read' + url);
//   const [stories, dispatchStories] = React.useReducer(
//     storiesReducer,
//     { data: [], isLoading: false, isError: false }
//   );

//   const handleFetchStories = React.useCallback(
//     async () => {
//       dispatchStories({ type: 'STORIES_FETCH_INIT' });

//       try {
//         const result = await axios.get(url);
//         dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.data.hits });
//       } catch {
//         dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
//       }
//     },
//     [url]
//   );

//   React.useEffect(
//     () => { handleFetchStories(); },
//     [handleFetchStories]
//   );

//   const handleRemoveStory = (item) => dispatchStories({ type: 'REMOVE_STORY', payload: item, });

//   const handleSearchInput = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     console.log('start of handleSearchSubmit');
//     setUrl(`${API_ENDPOINT}${searchTerm}`);

//     // event.preventDefault();  // prevents HTML native behaviour which would lead to a browser reload
//     console.log('end of handleSearchSubmit');
//   };

//   return (
//     <div>
//       <h1>My Hacker Stories</h1>

//       <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />

//       <hr />

//       {stories.isError && <p>Something went wrong ...</p>}

//       {stories.isLoading ? (
//         <p>Loading ...</p>
//       ) : (
//         <List
//           list={stories.data}
//           onRemoveItem={handleRemoveStory}
//         />
//       )}
//     </div>
//   );
// };

// const InputWithLabel = ({
//   id,
//   value,
//   type = 'text',
//   onInputChange,
//   isFocused,
//   children,
// }) => {
//   const inputRef = React.useRef();

//   React.useEffect(() => {
//     if (isFocused && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isFocused]);

//   return (
//     <>
//       <label htmlFor={id}>{children}</label>
//       &nbsp;
//       <input
//         ref={inputRef}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onInputChange}
//       />
//     </>
//   );
// };

// const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
//   <form onSubmit={onSearchSubmit}>
//     <InputWithLabel
//       id="search"
//       value={searchTerm}
//       isFocused
//       onInputChange={onSearchInput}
//     >
//       <strong>Search:</strong>
//     </InputWithLabel>

//     <button
//       type="submit"
//       disabled={!searchTerm}
//     >Submit</button>
//   </form>
// );

// const List = ({ list, onRemoveItem }) => (
//   <ul>
//     {list.map((item) => (
//       <Item
//         key={item.objectID}
//         item={item}
//         onRemoveItem={onRemoveItem}
//       />
//     ))}
//   </ul>
// );

// const Item = ({ item, onRemoveItem }) => (
//   <li>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//     <span>
//       <button type="button" onClick={() => onRemoveItem(item)}>
//         Dismiss
//       </button>
//     </span>
//   </li>
// );

// export default App;


// import * as React from 'react';


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//       displayedValue: '',
//     };
//   }

//   handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     this.setState({ inputValue, displayedValue: inputValue });
//   }

//   render() {
//     return (
//       <>
//         <input
//           type='text'
//           value={this.state.inputValue}
//           onChange={this.handleInputChange}
//           placeholder='Type here...'
//         />
//         <h2>Display:</h2>
//         <p>{this.state.displayedValue}</p>
//       </>
//     );
//   }
// };

// export default App;

import * as React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      inputValue: '',
      displayedValue: '',
    };
  };

  componentDidMount() {
    this.inputRef.current.focus();
  };

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue, displayedValue: inputValue });
  }

  render() {
    return (
      <>
        <input
          ref={this.inputRef}
          type='text'
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder='Type here...'
        />
        <h2>Display:</h2>
        <p>{this.state.displayedValue}</p>
      </>
    );
  };
};

export default App;
