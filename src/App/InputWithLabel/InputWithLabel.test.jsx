import  { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputWithLabel } from './index';

describe(
    'InputWithLabel',
    () => {
        it(
            'renders input field and label for it',
            () => {
                const onInputChange = vi.fn();
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
        it(
            'renders snapshot',
            () => {
                const { container } = render(<InputWithLabel id='search' value='React' onInputChange={vi.fn()} isFocused>Search:</InputWithLabel>);
                expect(container.children).toMatchSnapshot(); // use children here as InputWithLabel is a component composition
            }
        )
    }
);
