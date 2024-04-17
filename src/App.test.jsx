import  { describe, it, expect } from 'vitest';
import { storiesReducer, Item, List, SearchForm, InputWithLabel } from './App'

describe(  // describe is a test suite
    'Something truthy and falsy',
    () => {
        it('true should be true', () => {expect(true).toBeTruthy();});  // it is a test case
        it('false should be false', () => {expect(false).toBeFalsy();})
    }
);

const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
};

const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
};

const stories = [storyOne, storyTwo];

describe(
    'soriesReducer',
    () => {
        it(
            'removes story from all stories if action is REMOVE_STORY',
            () => {
                const action = { type: 'REMOVE_STORY', payload: storyOne };
                const state = { data: stories, isLoading: false, isError: false };

                const new_state = storiesReducer(state, action);
                const expected_state = { data: [storyTwo], isLoading: false, isError: false};

                expect(new_state).toStrictEqual(expected_state);
            }
        );
        it(
            'set isError to true if action is STORIES_FETCH_FAILURE',
            () => {
                const action = { type: 'STORIES_FETCH_FAILURE' };
                const state = { data: [], isLoading: false, isError: false };

                const new_state = storiesReducer(state, action);
                const expected_state = { data: [], isLoading: false, isError: true };

                expect(new_state).toStrictEqual(expected_state);
            }
        );
        it(
            'set data if action is STORIES_FETCH_SUCCESS',
            () => {
                const action = { type: 'STORIES_FETCH_SUCCESS', payload: stories };
                const state = { data: [], isLoading: false, isError: false };

                const new_state = storiesReducer(state, action);
                const expected_state = { data: stories, isLoading: false, isError: false };

                expect(new_state).toStrictEqual(expected_state);
            }
        );
        it(
            'set isLoading to true if action is STORIES_FETCH_INIT',
            () => {
                const action = { type: 'STORIES_FETCH_INIT' };
                const state = { data: [], isLoading: false, isError: false };

                const new_state = storiesReducer(state, action);
                const expected_state = { data: [], isLoading: true, isError: false };

                expect(new_state).toStrictEqual(expected_state);
            }
        );
    },
);
