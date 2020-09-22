import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';

const options = { 
    legend: { 
        display: false,
    }, 
    elements: { 
        point: { 
            radius: 0,
        },
    },
        maintainAspectRatio: false,
        tooltips: { 
            mode: "index",
            intersect: false,
            callbacks: {
            label: function (tooltipItem, data) { 
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
}
//tooltips are to be able to hover over the graph and see the value at that specific point

function LineGraph() {
    const [data, setData] = useState({});
    //API call for last 120 days of data  "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    const buildChartData = (data, caseType = 'cases') => { 
        const chartData = []
        let lastDataPoint

        for (let date in data.cases) {
            if (lastDataPoint) { 
                const newDataPoint = { 
                    x: date,
                    y: data['cases'][date] - lastDataPoint
                    //need to know the difference between last and current date
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data['cases'][date]
        }
        return chartData
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(resp => resp.json())
        .then(data => { 
            console.log(data)
            const chartData = buildChartData(data)
            setData(chartData)
        })
        
    }, []);

    
    
    return (
        <div>
            <h1>some graph here</h1>
           <Line  data={{ 
               datasets: [{data:data}]
           }} /> 
        </div>
    )
}

export default LineGraph
