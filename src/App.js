import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:5001')
      .then((results) => {
        setData(results.data.rates);
      })
  }, [reload]);

  const handleChange = (e) => {
    const searchCriteria = e.target.value;
    if (searchCriteria === '') {
      setReload(!reload);
      return;
    }
    const newdata = data.filter((country) => {
      return country.name.indexOf(searchCriteria) > -1
    })
    setData(newdata);
  }

  return (
    <div className='page'>
      <h5>European Countries And Codes</h5>
      <div className='section search'>
          <div className='search_box'><input onChange={handleChange} className="form-control form-control-lg" type='search' placeholder='Filter by name'/></div>
      </div>
      <div className='section results'>
          { data.length > 0 ? data.sort((countryA, countryB) => {
            return countryA.name < countryB.name ? -1 : 1;
          }).map((country, index) => {
            return <div className='result' key={index}><p>Country:<br /> {country.name}</p><p>Code: <br /> {country.code}</p></div>
          }) : <h5>No Results</h5>}
      </div>
    </div>
  );
}

export default App;
