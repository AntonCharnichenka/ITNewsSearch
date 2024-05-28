import  { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './index';

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

                // Snapshot testing does not inherently capture the runtime state of elements, 
                // such as whether an input is focused or not. 
                // The focus state is a dynamic DOM state that isn't represented directly in the markup or static attributes that would be visible in a snapshot.

                // Focus is not a DOM attribute: It does not have a corresponding attribute in the HTML output that snapshot testing would capture.
                // Focus is managed by the browser: The focus state is managed by the browser and typically only affects the styling and behavior (such as which element responds to keyboard inputs), rather than the underlying HTML.
            }
        )
    }
);
