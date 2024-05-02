import * as React from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { StyledItem, StyledColumn, StyledButtonSmall } from './styles';

export type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

export type Stories = Story[];

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};


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

export const Item = ({ item, onRemoveItem }: ItemProps ): JSX.Element => ( // or const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => ( ...
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="40%">{item.author}</StyledColumn>
    <StyledColumn width="40%">{item.num_comments}</StyledColumn>
    <StyledColumn width="40%">{item.points}</StyledColumn>
    <StyledColumn width="40%">
      <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
        <CiCircleRemove/>
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);
