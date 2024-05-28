export type Story = {
    objectID: string;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
  };
  
export type Stories = Story[];
  
export type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
  };
  
export type ListProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
  };

export type SortKey = 'NONE' | 'TITLE' | 'AUTHOR' | 'COMMENTS' | 'POINTS';

export type sortState = {sortKey: SortKey, isReversed: boolean};

export type SortFunction = (list: Stories) => Stories;
