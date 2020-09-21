import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Card, CardContent} from "@material-ui/core";
import Infobox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  
  //State is basically writing a variable in react
  //API call for countries from "https://disease.sh/v3/covid-19/countries"
  //USEEFFECT runs piece of code based on condition

  useEffect(() => { 
    //code runs once when component loads and whenever variable changes
    //send async req, wait for resp, execute action
    const getCountriesData = async () => { 
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((resp) => resp.json())
      .then((data) => { 
        const countries = data.map((country) => ( 
          { 
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          setCountries(countries)
      })
    }
    getCountriesData()
  }, []);

  const onCountryChange = async (e) => { 
    const countryCode = e.target.value
    setCountry(countryCode)
  };
  const test = "Worldwide"
  return (
    <div className="app"> 
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown"> 
      {/* <InputLabel>Worldwide</InputLabel> */}
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
          {/* loop through all countries 
          and show a drop down of options */}
          { 
            countries.map(country => ( 
              
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
          
          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Test</MenuItem>
          <MenuItem value="worldwide">Test 2</MenuItem> */}
        </Select>
      </FormControl>

      </div>
          <div className="app__stats">
            <Infobox title="Coronavirus Cases"></Infobox>
            <Infobox title="Recovered"></Infobox>
            <Infobox title="Deaths"></Infobox>
          </div>

     

      {/* Header */}
      {/* Title + Drop down */}

      

      {/* table */}
      {/* graph */}

      {/* map */}
          <Map></Map>
      </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            {/* table */}
            <h3>Worldwide New Cases</h3>
            {/* graph */}
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
