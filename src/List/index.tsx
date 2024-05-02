import * as React from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { ListProps, ItemProps } from './types';
import { StyledItem, StyledColumn } from './style';
import { StyledButtonSmall } from '../shared/styles';

export const List: React.FC<ListProps> = ({ list, onRemoveItem }): JSX.Element => ( // or return type could also be React.ReactNode
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

export const Item = ({ item, onRemoveItem }: ItemProps): JSX.Element => ( // or const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => ( ...
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="40%">{item.author}</StyledColumn>
    <StyledColumn width="40%">{item.num_comments}</StyledColumn>
    <StyledColumn width="40%">{item.points}</StyledColumn>
    <StyledColumn width="40%">
      <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
        <CiCircleRemove />
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);
