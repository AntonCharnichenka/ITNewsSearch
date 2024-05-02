import  { describe, it, expect, vi } from 'vitest';
import { storiesReducer } from './index'
import App from './index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

vi.mock('axios');

// describe(  // it is a test suite
//     'Something truthy and falsy',
//     () => {
//         it('true should be true', () => {expect(true).toBeTruthy();});  // it is a test case
//         it('false should be false', () => {expect(false).toBeFalsy();})
//     }
// );

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

describe(
    'App',
    () => {
        it(
            'succeeds fetching data',
            async () => {
                const promise = Promise.resolve({ data: { hits: stories } });
                axios.get.mockImplementationOnce(() => promise);

                render(<App/>);

                expect(screen.getByText(/loading/i)).toBeInTheDocument();

                await waitFor(async () => await promise);

                expect(screen.queryByText(/loading/i)).toBeNull();

                expect(screen.getByText('React')).toBeInTheDocument();
                expect(screen.getByText('Redux')).toBeInTheDocument();
                expect(screen.getAllByRole('button').length).toBe(3);
            }
        );
        it(
            'fails fetching data',
            async () => {
                const promise = Promise.reject();
                axios.get.mockImplementationOnce(() => promise);

                render(<App/>);

                expect(screen.getByText(/loading/i)).toBeInTheDocument();

                try {
                    await waitFor(async () => await promise);
                } catch (error) {
                    expect(screen.queryByText(/loading/i)).toBeNull();
                    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
                }


            }
        );
        it(
            'removes a story',
            async () => {
                const promise = Promise.resolve( {data: { hits: stories }} );
                axios.get.mockImplementationOnce(() => promise);

                render(<App/>);

                await waitFor(async () => await promise);

                expect(screen.getAllByRole('button').length).toBe(3);
                expect(screen.getByText('Jordan Walke')).toBeInTheDocument();

                fireEvent.click(screen.getAllByRole('button')[1]); // 1st button is submit for search input, 2nd is for removing 1st story

                expect(screen.getAllByRole('button').length).toBe(2);
                expect(screen.queryByText('Jordan Walke')).toBeNull();
            }
        );
        it(
            'searches for specific stories',
            async () => {
                const reactPromise = Promise.resolve({ data: { hits: stories } });
                const anotherStory = {
                    title: 'JavScript',
                    url: 'https://js.org/',
                    author: 'Brendan Eich',
                    num_comments: 15,
                    points: 10,
                    objectID: 2,
                };
                const javascriptPromise = Promise.resolve({ data: { hits: [anotherStory] } })

                axios.get.mockImplementation(
                    (url) => {
                        if (url.includes('React')) {
                            return reactPromise;
                        }
                        if (url.includes('JavScript')) {
                            return javascriptPromise;
                        }

                        throw Error();
                    }
                );

                render(<App/>);

                await waitFor(async () => await reactPromise);

                expect(screen.getByDisplayValue('React')).toBeInTheDocument();
                expect(screen.queryByDisplayValue('JavScript')).toBeNull();
                expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
                expect(screen.queryByText('Dan Abramov')).toBeNull();
                expect(screen.queryByText('Brendan Eich')).toBeNull();

                // User interaction -> Search
                fireEvent.change(
                    screen.getByDisplayValue('React'),
                    { target: { value: 'JavScript' } }
                );

                expect(screen.queryByDisplayValue('React')).toBeNull();
                expect(screen.getByDisplayValue('JavScript')).toBeInTheDocument();


                const form = screen.getByLabelText(/search/i).parentNode;
                const submit_button = form.querySelector('button');

                // Second data fetching

                fireEvent.submit(submit_button);

                await waitFor(async () => await javascriptPromise);

                expect(screen.queryByText('Jordan Walke')).toBeNull();
                expect(screen.queryByText('Dan Abramov')).toBeNull();
                expect(screen.getByText('Brendan Eich')).toBeInTheDocument();
            }
        )
    }
);
