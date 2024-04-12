import * as React from 'react';
import axios from 'axios';
// import styles from './App.module.css';
import styled from 'styled-components';

// import CheckIcon from './check.svg?react';
// import GlassIcon from './simple_glass.svg?react';
import { CiSearch } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;
  background: #83a4d4;  /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const StyledItem = styled.li`
  display: flex;
  aligh-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: inherit;
  };

  width: ${(props) => props.width};
`;

const StyledButton = styled.button`
  backround: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  };

  &:hover > svg > g {
    fill: #ffffff;
    stroke: #ffffff;
  };

  &:hover > svg > path {
    // fill: #ffffff;
    stroke: #ffffff;
  };
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  alight-items: baseline;
`;

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px; 
`;

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const isMounted = React.useRef(false); 
  
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const getSumComments = (stories) => {
  const sumComments = stories.data.reduce((result, value) => result + value.num_comments, 0);

  return sumComments
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = React.useCallback(
    (item) => {
      dispatchStories({
        type: 'REMOVE_STORY',
        payload: item,
      });
    },
    []
  );

  const handleSearchInput = React.useCallback((event) => setSearchTerm(event.target.value), [setSearchTerm]);

  const handleSearchSubmit = React.useCallback(
    (event) => {
      setUrl(`${API_ENDPOINT}${searchTerm}`);

      event.preventDefault();  
    },
    [setUrl, searchTerm]
  );

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  console.log('APP');

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments</StyledHeadlinePrimary>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};

const SearchForm = React.memo(
  ( {
    searchTerm,
    onSearchInput,
    onSearchSubmit,
  } ) => (
    console.log('SearchForm') || <StyledSearchForm onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <StyledButtonSmall type="submit" disabled={!searchTerm}>
        <CiSearch/>
      </StyledButtonSmall>
    </StyledSearchForm>
  )
);

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      &nbsp;
      <StyledInput
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = React.memo(
  ({ list, onRemoveItem }) => (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  )
);

const Item = React.memo(({ item, onRemoveItem }) => (
  console.log('Item redners') || <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="40%">{item.author}</StyledColumn>
    <StyledColumn width="40%">{item.num_comments}</StyledColumn>
    <StyledColumn width="40%">{item.points}</StyledColumn>
    <StyledColumn width="40%">
      <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
        <CiCircleRemove/>
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
));

export default App;
