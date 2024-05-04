import * as React from 'react';
import { sortBy } from 'lodash'; 
import { CiCircleRemove } from "react-icons/ci";
import { FaSort } from "react-icons/fa";
import { ListProps, ItemProps, Stories, SortKey, SortFunction } from './types';
import { StyledItem, StyledColumn } from './style';
import { StyledButtonSmall } from '../shared/styles';

export const List: React.FC<ListProps> = ({ list, onRemoveItem }): JSX.Element => { // or return type could also be React.ReactNode
  const [sort, setSort] = React.useState<SortKey>('NONE');
  const handleSort = (sortKey: SortKey) => setSort(sortKey);

  const Sorts: Record<SortKey, SortFunction> = {
    'NONE': (list: Stories): Stories => list,
    'TITLE': (list: Stories): Stories => sortBy(list, 'title'),
    'AUTHOR': (list: Stories): Stories => sortBy(list, 'author'),
    'COMMENTS': (list: Stories): Stories => sortBy(list, 'num_comments').reverse(),
    'POINTS': (list: Stories): Stories => sortBy(list, 'points').reverse(),
  };

  const sortFunction = Sorts[sort];
  const sortedList = sortFunction(list);
  
  return <ul>
    <StyledItem>
      <StyledColumn width="40%">
        <StyledButtonSmall type="button" onClick={() => handleSort('TITLE')}>Title<FaSort color={sort === 'TITLE' ? 'red' : undefined}/>
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="25%">
        <StyledButtonSmall type="button" onClick={() => handleSort('AUTHOR')}>Author<FaSort color={sort === 'AUTHOR' ? 'red' : undefined}/>
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="15%">
        <StyledButtonSmall type="button" onClick={() => handleSort('COMMENTS')}>Comments<FaSort color={sort === 'COMMENTS' ? 'red' : undefined}/>
        </StyledButtonSmall>
      </StyledColumn>
      <StyledColumn width="10%">
        <StyledButtonSmall type="button" onClick={() => handleSort('POINTS')}>Points<FaSort color={sort === 'POINTS' ? 'red' : undefined}/>
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
