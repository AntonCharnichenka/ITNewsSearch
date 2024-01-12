import * as React from 'react';

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isOpen, setOpen] = React.useState(false);
  const onClick = () => {setOpen(!isOpen)};

  const [favorite, setFavorite] = React.useState('dog')

  const handleCatCHange = () => {
    setFavorite('cat');
  };

  const handleDogCHange = () => {
    setFavorite('dog');
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" label="search" value={searchTerm} onInputChange={handleSearch} />

      <hr />

      <List list={searchedStories} />

      <hr />
      
      <>
      <Button type='button' onClick={onClick}>Click Me!</Button>
      {isOpen && <div>Content</div>}
      </>

      <hr />

      <>
      <RadioButton label="Cat" value={favorite === 'cat'} onCHange={handleCatCHange}></RadioButton>
      <br></br>
      <RadioButton label="Dog" value={favorite === 'dog'} onChange={handleDogCHange}></RadioButton>
      </>
  
    </div>
  );
};

const InputWithLabel = ({ id, label, value, type = 'text', onInputChange }) => (
  <>  
    <label htmlFor={id}>{label} </label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a> -
    </span>
    <span> Author: {item.author},</span>
    <span> Comemnts: {item.num_comments},</span>
    <span> Points: {item.points}</span>
  </li>
);

const Button = ( {type='button', onClick, children, ...rest} ) => {
  return (
  <button type={type} onClick={onClick} {...rest}>
    {children}
  </button>
  );
};

const RadioButton = ( {label, value, onCHange, ...rest} ) => {
  return (
    <label>
      <input type='radio' checked={value} onChange={onCHange} {...rest}/>
      {label}
    </label>
  );
};

export default App;
