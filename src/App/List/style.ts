import styled from 'styled-components';

export const StyledItem = styled.li`
  display: flex;
  aligh-items: center;
  padding-bottom: 5px;
`;

export const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: inherit;
  };

  width: ${(props) => props.width};
`;
