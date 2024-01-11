import * as React from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const INITIAl_QUERY = 'React';

const App = () => {
  const [data, setData] = React.useState({hits: []});
  const [query, setQuery] = React.useState(INITIAl_QUERY);
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${INITIAl_QUERY}`);

  React.useEffect(
    () => {
      const fetchData = async () => {
        const cachedResult = JSON.parse(localStorage.getItem(url));
        let result;
        if (cachedResult) {
          result = cachedResult;
        } else {
          result = await axios(url);
          localStorage.setItem(url, JSON.stringify(result));
        }
        
        setData({hits: result.data.hits});
      };
      fetchData();
    },
    [url]
  );

  console.log(`returning jsx`)
  return (
    <>
      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)}/>
      <button type="button" onClick={() => setUrl(`${API_ENDPOINT}${query}`)}>Search</button>
      <ul>
        {data.hits.map((item) => <li key={item.objectID}><a href={item.url}>{item.title}</a></li>)}
      </ul>
    </>
  );
};

export default App;
