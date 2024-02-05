import * as React from 'react';

function App() {
  const [text, setText] = React.useState('Some text ...');

  function handleOnChange(event) {
    setText(event.target.value);
  }

  const ref = (node) => {
    console.log('REF CALLBACK CALLED')
    
    if (!node) {
      console.log('RETURNING NOTHING FROM REF CALLBACK')
      return
    };

    console.log('REF CALLBACK CALLED WITH NODE', node)
    const { width } = node.getBoundingClientRect();

    if (width >= 150) {
      node.style.color = 'red';
    } else {
      node.style.color = 'blue';
    }
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}

export default App;

// create a class with a constructor with parameter 'number' and method to print it
class Number {
  constructor(number) {
    this.number = number;
  }

  print() {
    console.log(this.number);
  }
}

// create instance of this class
const number = new Number(5);