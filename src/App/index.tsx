import * as React from 'react';
import axios from 'axios';
// import styles from './App.module.css';
import { List } from './List';
import { Story } from './List/types';
import { SearchForm } from './SearchForm';
import { StyledContainer, StyledHeadlinePrimary } from './style';
import { StoriesAction, StoriesState, LastSearchesProps, HandleLastSearchesFunction, SearchTerm } from './types';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const storiesReducer = (state: StoriesState, action: StoriesAction): StoriesState => {  // return tyoe is inferred, so it might be not type annotated
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
        data: action.payload.page === 0 ? action.payload.list : state.data.concat(action.payload.list),
        page: action.payload.page,
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

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const isMounted = React.useRef(false);

  const [value, setValue] = React.useState(  // value is inferred to be a string, setValue only takes a string as an argument
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => { // no need to add types here as they are inferred
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const getSumComments = (stories: StoriesState): number => {
  const sumComments = stories.data.reduce((result, value) => result + value.num_comments, 0);

  return sumComments
};


// const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='

const getUrl = (searchTerm: string, page: number): string => `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url: string): string => url.substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&')).replace(PARAM_SEARCH, '')

const get5lastSearches = (urls: string[]): string[] => urls.reduce(
  (result: string[], url: string, index: number): string[] => {
    const searchTerm = extractSearchTerm(url);

    if (index === 0) {
      return result.concat(searchTerm);
    };

    const previousSearchTerms = result[result.length - 1];

    if (searchTerm === previousSearchTerms) {
      return result;
    } else {
      return result.concat(searchTerm);
    };
  },
  []
).slice(-6).slice(0, -1);


const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  const [urls, setUrls] = React.useState(
    [getUrl(searchTerm, 0)]
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], page: 0, isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(
    async () => {
      dispatchStories({ type: 'STORIES_FETCH_INIT' });

      try {
        const lastUrl = urls[urls.length - 1];
        const result = await axios.get(lastUrl);

        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: {
            list: result.data.hits,
            page: result.data.page,
          },
        });

      } catch {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
      }
    },
    [urls]
  );

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story): void => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const hadleSearch = (searchTerm: SearchTerm, page: number): void => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    hadleSearch(searchTerm, 0);

    event.preventDefault();
  };

  const handleLastSearch: HandleLastSearchesFunction = (searchTerm) => {
    setSearchTerm(searchTerm);
    hadleSearch(searchTerm, 0);
  };

  const handleMore = (): void => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    hadleSearch(searchTerm, stories.page + 1);
  };

  const lastSearches = get5lastSearches(urls);

  const sumComments = React.useMemo(() => getSumComments(stories), [stories]);

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments</StyledHeadlinePrimary>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      {lastSearches.length > 0 && <LastSearches lastSearches={lastSearches} handleLastSearch={handleLastSearch} />}
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      {/* style button below */}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : <button type='button' onClick={handleMore}>More</button>}
    </StyledContainer>
  );
};

const LastSearches: React.FC<LastSearchesProps> = ({ lastSearches, handleLastSearch }) => (
  <div style={{ display: "flex" }}>
    <label htmlFor="last-searches">Last searches:</label>
    &nbsp;
    <div id="last-searches">
      {
        lastSearches.map(
          (searhTerm, index) => <button key={searhTerm + index} type="button" onClick={() => handleLastSearch(searhTerm)}>{searhTerm}</button>
        )
      }
    </div>
  </div>
);

export default App;
