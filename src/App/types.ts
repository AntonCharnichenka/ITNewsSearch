import { Story, Stories } from '../List/types';

export type StoriesFetchInitAction = {
    type: 'STORIES_FETCH_INIT';
  };
  
export type StoriesState = {
data: Stories;
isLoading: boolean;
isError: boolean;
};

export type StoriesFetchSuccessAction = {
type: 'STORIES_FETCH_SUCCESS';
payload: Stories;
};

export type StoriesFetchFailureAction = {
type: 'STORIES_FETCH_FAILURE';
};

export type StoriesRemoveAction = {
type: "REMOVE_STORY";
payload: Story;
};

export type StoriesAction = StoriesFetchInitAction | StoriesFetchSuccessAction | StoriesFetchFailureAction | StoriesRemoveAction;
