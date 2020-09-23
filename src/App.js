import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import Infobox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import './App.css';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import { printStat } from './util'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, SetCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80748, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases")

  useEffect(() => { 
    fetch("https://disease.sh/v3/covid-19/all")
    .then((resp) => resp.json())
    .then((data) => { 
      SetCountryInfo(data)
    })
  }, [])
  //testing something
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
          setMapCountries(data)
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
      //On the change the map will move the default center to the country of choice. This is info from the api also... Thats pretty cool bruv
      setMapCenter([data.countryInfo.lat, data.countryInfo.long])
      setMapZoom(4);
    })
  };
  //console.log("country info", countryInfo)
  return (
    <div className="app"> 
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown"> 
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="Worldwide">Worldwide</MenuItem>
          {/* loop through all countries 
          and show a drop down of options */}
          { 
            countries.map(country => ( 
              
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        
        </Select>
      </FormControl>

      </div>
          <div className="app__stats">
            <Infobox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Coronavirus Cases" cases={printStat(countryInfo.todayCases)} total={printStat(countryInfo.cases)} />
            <Infobox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recovered" cases={printStat(countryInfo.todayRecovered)} total={printStat(countryInfo.recovered)} />
            <Infobox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={printStat(countryInfo.todayDeaths)} total={printStat(countryInfo.deaths)} />
          </div>
          <Map
          casesType={casesType}
            countries={mapCountries} 
            center={mapCenter}
            zoom={mapZoom}
          />
      </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
