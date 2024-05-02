import * as React from 'react';
import  { InputWithLabelProps } from './types';
import  { StyledInput, StyledLabel } from './style';


export const InputWithLabel: React.FC<InputWithLabelProps> = ({
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children,
  }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
  
    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return (
      <>
        <StyledLabel htmlFor={id}>{children}</StyledLabel>
        &nbsp;
        <StyledInput
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
      </>
    );
  };
  