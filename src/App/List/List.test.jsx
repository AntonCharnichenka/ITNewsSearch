import  { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Item, List } from './index';

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
    'List',
    () => {
        it(
            'renders items and sort buttons', 
            () => {
                const onRemoveItem = vi.fn();
                render(<List list={stories} onRemoveItem={onRemoveItem}/>);

                expect(screen.getAllByRole('listitem')).toHaveLength(3);

                const sort_buttons = screen.getByText('Comments').closest('li');
                expect(within(sort_buttons).getAllByRole('button')).toHaveLength(4);
                expect(within(sort_buttons).getByText('Title')).toBeInTheDocument();
                expect(within(sort_buttons).getByText('Author')).toBeInTheDocument();
                expect(within(sort_buttons).getByText('Points')).toBeInTheDocument();

                const react_item = screen.getByText('React').closest('li');
                const redux_item = screen.getByText('Redux').closest('li');
                expect(within(react_item).getByText('Jordan Walke')).toBeInTheDocument();
                expect(within(redux_item).getByText('Dan Abramov, Andrew Clark')).toBeInTheDocument();
                const react_item_button = within(react_item).getByRole('button');
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
        it.todo('test sorting items')
    }
);
