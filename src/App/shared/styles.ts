import styled from 'styled-components';

export const StyledButton = styled.button`
  backround: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  };

  &:hover > svg > g {
    fill: #ffffff;
    stroke: #ffffff;
  };

  // &:hover > svg > path {
  //   // fill: #ffffff;
  //   stroke: #ffffff;
  // };
  }
`;

export const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

export const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;
