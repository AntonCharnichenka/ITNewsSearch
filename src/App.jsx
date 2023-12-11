import * as React from 'react';

const title = 'React';

const welcome = {
  greeting: 'hey',
  title: 'React',
};

const number = 1;

function getTitle(title) {
  return title;
}

const array = ['Hello', 'React', 'from', 'array', 1]

// const list = ['list item 1', 'list item 2', 'list item 3']

const list1 = [
  {
    title: "React",
    points: 4,
    id: 0,
    url: "https://google.com"  // absolute url
  },
  {
    title: "Redux",
    points: 5,
    id: 1,
    url: "www.bbc.com"  // react treats this as relative url to the root
  },
]

const list2 = [
  {
    title: "JS",
    points: 6,
    id: 0,
    url: "https://google.com"
  },
  {
    title: "HTML",
    points: 7,
    id: 1,
    url: "www.bbc.com"
  },
]

const App = () => {
  const [count, setCount] = React.useState(0);
  const handleClick = (event, delta) => {
    console.log("onCLick event " + delta);
    setCount(count + delta);

    return null;
  }

  const [text, setText] = React.useState('')
  const handleChange = (event) => {
    setText(event.target.value);
  } 

  return <div>
    <h1>Hello {title}</h1>
    <Search/>
    <h1>{welcome.greeting} {welcome.title}</h1>
    <h1>Hello {getTitle('React')} again!</h1>
    <h2>Number is {number}</h2>
    <h2>{array.join(' ')}</h2>
    <p>Here is the list</p>
    <List list={list1}/>
    <p>Here is another list</p>
    <List list={list2}/>

    <div>
      Count: {count}
      <button type="button" onClick={(event) => handleClick(event, 1)}>
        Increase count
      </button>
      <button type="button" onClick={(event) => handleClick(event, -1)}>
        Decerease count
      </button>
    </div>

    <div>
      <p>Text input handler</p>
      <input type="text" value={text} onChange={handleChange}></input>
      {text}
    </div>

  </div>
}


const Search = () => {
  const handleChange = (event) => {
    // synthetic event
    console.log(event);
    // value of target (input html element)
    console.log(event.target.value);
  };

  const onBlurHandler = (event) => {
    // Event handler called when a field loses focus

    console.log("onBlurHandler");
    // synthetic event
    console.log(event);
    // value of target (input html element)
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor='search'>Search</label>
      <input id='search' type='text' onChange={handleChange} onBlur={onBlurHandler}></input>
    </div>
  );
};


const List = ({list}) => 
  (
  <ul>
    {list.map(item => <Item id={item.id} url={item.url} title={item.title} points={item.points}/>)}
  </ul>
  );

const Item = ({id, url, title, points}) => 
  <li key={id}><span><a href={url} target="blank">{title}</a></span><span> {points}</span></li>;

export default App;
