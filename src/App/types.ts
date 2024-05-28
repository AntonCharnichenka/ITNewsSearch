import { Story, Stories } from './List/types';

export type StoriesFetchInitAction = {
  type: 'STORIES_FETCH_INIT';
};

export type StoriesState = {
  data: Stories;
  page: number;
  isLoading: boolean;
  isError: boolean;
};

type Payload = {
  list: Stories;
  page: number;
};

export type StoriesFetchSuccessAction = {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Payload;
};

export type StoriesFetchFailureAction = {
  type: 'STORIES_FETCH_FAILURE';
};

export type StoriesRemoveAction = {
  type: "REMOVE_STORY";
  payload: Story;
};

export type StoriesAction = StoriesFetchInitAction | StoriesFetchSuccessAction | StoriesFetchFailureAction | StoriesRemoveAction;

export type SearchTerm = string;

export type LastSearches = SearchTerm[];

export type HandleLastSearchesFunction = (searchTerm: SearchTerm) => void;

export type LastSearchesProps = {
  lastSearches: LastSearches;
  handleLastSearch: HandleLastSearchesFunction;
};

// export type extractSearchTermFunction = (url: string) => SearchTerm;

// export type  get5lastSearchesFunction = (urls: string[]) => string[];
