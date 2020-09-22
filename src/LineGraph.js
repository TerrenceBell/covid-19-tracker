import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph() {
    const [data, setData] = useState({});
    //API call for last 120 days of data  "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(resp => resp.json())
        .then(data => { 
            console.log(data)
        })
        
    }, []);

    const buildChartData = data => { 
        const chartData = []
        let lastDataPoint

        data.cases.forEach(date => {
            if (lastDataPoint) { 
                const newDataPoint = { 
                    x: date,
                    y: data['cases'][date] - lastDataPoint
                    //need to know the difference between last and current date
                }
                chartData.push(newDataPoint)
            }
            
        })
    }
    return (
        <div>
            <h1>some graph here</h1>
           {/* <Line  data options />  */}
        </div>
    )
}

export default LineGraph
