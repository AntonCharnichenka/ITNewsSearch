import * as React from 'react'

const title = 'React'

const welcome = {
  greeting: 'hey',
  title: 'React',
};

const number = 1;

function getTitle(title) {
  return title;
}

const array = ['Hello', 'React', 'from', 'array', 1]

const list = ['list item 1', 'list item 2', 'list item 3']

function App() {
  // do something in between
  return (
    <div>
      <h1>Hello {title}</h1>
      <label htmlFor='search'>Search</label>
      <input id='search' type='text'></input>
      <h1>{welcome.greeting} {welcome.title}</h1>
      <h1>Hello {getTitle('React')} again!</h1>
      <h2>Number is {number}</h2>
      <h2>{array.join(' ')}</h2>
      <p>Here is the list</p>
      <ol>
        {
          list.map(element => <li>{element + ' abc'}</li>)
        }
      </ol>
    </div>
  );
}

export default App;