import * as React from 'react';
import { sortBy } from 'lodash';
import { CiCircleRemove } from "react-icons/ci";
// import { FaSort } from "react-icons/fa";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { ListProps, ItemProps, Stories, SortKey, sortState, SortFunction } from './types';
import { StyledItem, StyledColumn } from './style';
import { StyledButtonSmall } from '../shared/styles';

export const List: React.FC<ListProps> = ({ list, onRemoveItem }): JSX.Element => { // or return type could also be React.ReactNode
  const [sort, setSort] = React.useState<sortState>(
    {
      sortKey: 'NONE',
      isReversed: false
    }
  );
  const handleSort = (sortKey: SortKey) => {
    const isReversed = sort.sortKey === sortKey && !sort.isReversed;
    setSort({ sortKey, isReversed });  // shorthand object initializer notation 
  };

  const Sorts: Record<SortKey, SortFunction> = {
    'NONE': (list: Stories): Stories => list,
    'TITLE': (list: Stories): Stories => sortBy(list, 'title'),
    'AUTHOR': (list: Stories): Stories => sortBy(list, 'author'),
    'COMMENTS': (list: Stories): Stories => sortBy(list, 'num_comments').reverse(),
    'POINTS': (list: Stories): Stories => sortBy(list, 'points').reverse(),
  };

  const sortFunction = Sorts[sort.sortKey];
  const sortedList = sort.isReversed ? sortFunction(list).reverse() : sortFunction(list);

  const getSortPictogram = (sortKey: SortKey) => {
    const GoSort = sort.isReversed ? GoSortDesc : GoSortAsc;
    return <GoSort color={sortKey === sort.sortKey ? 'red' : undefined} />
  };

  return <ul>
    <StyledItem>
      <StyledColumn width="40%">
        <StyledButtonSmall
          type="button"
          onClick={() => handleSort('TITLE')}>Title{getSortPictogram('TITLE')}
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="25%">
        <StyledButtonSmall
          type="button"
          onClick={() => handleSort('AUTHOR')}>Author{getSortPictogram('AUTHOR')}
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="15%">
        <StyledButtonSmall
          type="button"
          onClick={() => handleSort('COMMENTS')}>Comments{getSortPictogram('COMMENTS')}
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="10%">
        <StyledButtonSmall
          type="button"
          onClick={() => handleSort('POINTS')}>Points{getSortPictogram('POINTS')}
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="10%"></StyledColumn>
    </StyledItem>

    {sortedList.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
};

export const Item = ({ item, onRemoveItem }: ItemProps): JSX.Element => ( // or const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => ( ...
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="25%">{item.author}</StyledColumn>
    <StyledColumn width="15%">{item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{item.points}</StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
        <CiCircleRemove />
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);
