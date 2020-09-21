import React from 'react';
import { MenuItem, FormControl, Select} from "@material-ui/core";
import './App.css';

function App() {
  return (
    <div className="app"> 
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown"> 
        <Select variant="outlined" value="abc">
          {/* loop through all countries 
          and show a drop down of options */}
          
          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Test</MenuItem>
          <MenuItem value="worldwide">Test 2</MenuItem> */}
        </Select>
      </FormControl>

      </div>

     

      {/* Header */}
      {/* Title + Drop down */}

      {/* info boxes  */}
      {/* info boxes  */}
      {/* info boxes  */}

      {/* table */}
      {/* graph */}

      {/* map */}

    </div>
  );
}

export default App;
