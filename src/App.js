import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Card, CardContent} from "@material-ui/core";
import Infobox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, SetCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => { 
    fetch("https://disease.sh/v3/covid-19/all")
    .then((resp) => resp.json())
    .then((data) => { 
      SetCountryInfo(data)
    })
  })
  
  //State is basically writing a variable in react
  //API call for countries from "https://disease.sh/v3/covid-19/countries"
  //API call for worldwide from "https://disease.sh/v3/covid-19/all
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
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
      })
    }
    getCountriesData()
  }, []);

  const onCountryChange = async (e) => { 
    const countryCode = e.target.value
    setCountry(countryCode);

    const url = countryCode === 'Worldwide'
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(resp => resp.json())
    .then(data => { 
      setCountry(countryCode)
      //all country data
      SetCountryInfo(data)
    })
  };
  //console.log("country info", countryInfo)
  return (
    <div className="app"> 
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown"> 
      {/* <InputLabel>Worldwide</InputLabel> */}
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="Worldwide">Worldwide</MenuItem>
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
            <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          </div>
          <Map />
      </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide New Cases</h3>
            {/* graph */}
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
