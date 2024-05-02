import  { describe, it, expect, vi } from 'vitest';
import { storiesReducer } from './App'
import App from './App';
import { List, Item } from './List';
import { SearchForm } from './SearchForm';
import { InputWithLabel } from './InputWithLabel';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
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
    'Item',
    () => {
        it(
            'renders all properties',
            () => {
                render(<Item item={storyOne}/>); // renders the element in jsdom environment
                // screen.debug(); // prints the html of the rendered element
                
                expect(screen.getByText('React')).toHaveAttribute('href', 'https://reactjs.org/'); // expect needs extesion by toHaveAttribute assertion method (in setup.js) 
                expect(screen.getByText('Jordan Walke')).toBeInTheDocument(); // same as for toHaveAttribute

            }
        );
        it(
            'renders a clickable dismiss button',
            () => {
                render(<Item item={storyOne}/>);
                expect(screen.getByRole('button')).toBeInTheDocument();
            }
        );
        it(
            'clicking dismiss button calls callback handler',
            () => {
                const handleRemoveItem = vi.fn();
                render(<Item item={storyOne} onRemoveItem={handleRemoveItem}/>)
                
                fireEvent.click(screen.getByRole('button'));

                expect(handleRemoveItem).toHaveBeenCalledTimes(1);
                expect(handleRemoveItem).toHaveBeenCalledWith(storyOne);
            }
        )
        it(
            'renders snapshot',
            () => {
                const { container } = render(<Item item={storyOne}/>);
                expect(container.firstChild).toMatchSnapshot();
            }
        )

    }
);

describe(
    'SearchForm',
    () => {
        const searchFormProps = {
            searchTerm: 'React',
            onSearchInput: vi.fn(),
            onSearchSubmit: vi.fn(),
        };

        it(
            'renders input field with its value',
            () => {
                render(<SearchForm {...searchFormProps}/>);
                // screen.debug();
                expect(screen.getByDisplayValue('React')).toBeInTheDocument();
            }
        );

        it(
            'renders correct label',
            () => {
                render(<SearchForm {...searchFormProps}/>);
                expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
            }
        );

        it(
            'calls onSearchInput on input field change',
            () => {
                render(<SearchForm {...searchFormProps}/>);
                
                fireEvent.change(
                    screen.getByDisplayValue('React'),
                    { target: { value: 'Redux' }}
                );

                expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
                // expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(
                //     expect.objectContaining(
                //         { target: expect.objectContaining({ value: 'Redux' }) }
                //     )
                // );
            }
        );

        it(
            'calls onSearchSubmit on button submit click',
            () => {
                render(<SearchForm {...searchFormProps}/>);
                
                fireEvent.submit(screen.getByRole('button'));

                expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
            }
        )

        it(
            'renders snapshot',
            () => {
                const { container } = render(<SearchForm {...searchFormProps}/>);
                expect(container.firstChild).toMatchSnapshot();
            }
        )
    }
);

describe(
    'List',
    () => {
        it(
            'renders items', 
            () => {
                const onRemoveItem = vi.fn();
                render(<List list={stories} onRemoveItem={onRemoveItem}/>);

                expect(screen.getAllByRole('listitem')).toHaveLength(2);

                const react_item = screen.getByText('React').closest('li');
                const redux_item = screen.getByText('Redux').closest('li');

                expect(react_item).toBeInTheDocument();
                expect(redux_item).toBeInTheDocument();

                expect(within(react_item).getByText('Jordan Walke')).toBeInTheDocument();
                expect(within(redux_item).getByText('Dan Abramov, Andrew Clark')).toBeInTheDocument();

                const react_item_button = within(react_item).getByRole('button');

                expect(react_item_button).toBeInTheDocument();
                expect(within(redux_item).getByRole('button')).toBeInTheDocument();

                fireEvent.click(react_item_button);

                expect(onRemoveItem).toHaveBeenCalledTimes(1);
                expect(onRemoveItem).toHaveBeenCalledWith(storyOne);
            }
        )
        it(
            'renders snapshot',
            () => {
                const { container } = render(<List list={stories}/>);
                expect(container.firstChild).toMatchSnapshot();
            }
        )
    }
);

describe(
    'InputWithLabel',
    () => {
        it(
            'renders input field and label for it',
            () => {
                const onInputChange = vi.fn();
                // const a = (a_event) => {
                //     const aa = 1;
                // }
                render(<InputWithLabel id='search' value='React' onInputChange={onInputChange} isFocused>Search:</InputWithLabel>)
                // screen.debug();

                expect(screen.getByLabelText(/search/i)).toBeInTheDocument();

                const input = screen.getByDisplayValue('React');
                expect(input).toBeInTheDocument();

                expect(input).toHaveFocus();
                expect(input).toHaveAttribute('id', 'search');

                fireEvent.change(input, {target: {value: 'Redux'}});
                expect(onInputChange).toHaveBeenCalledTimes(1);
                

                // expect(onInputChange).toHaveBeenCalledWith(
                //     expect.objectContaining({ target: expect.objectContaining({ value: 'Redux' }) })
                // );    
            }
        )
        // it(
        //     'renders snapshot',
        //     () => {
        //         const { container } = render(<InputWithLabel id='search' value='React' isFocused>Search:</InputWithLabel>);
        //         expect(container.firstChild).toMatchSnapshot();
        //     }
        // )

        // in the test above: wait input to be focused then make and check snapshot
    }
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
