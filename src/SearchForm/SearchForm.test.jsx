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
            }
        )
    }
);
