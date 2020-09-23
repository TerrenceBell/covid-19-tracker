import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

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
    scales: { 
        xAxes: [ 
            { 
                type: "time", 
                time: { 
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [ 
           { 
            gridLines: { 
                display: false,
            },
            ticks: { 
                callback: function (value, index, values) { 
                    return numeral(value).format("0a")
                },
            },
          } ,
        ],
    },
}
//tooltips are to be able to hover over the graph and see the value at that specific point

const buildChartData = (data, casesType) => { 
    const chartData = []
    let lastDataPoint

    for (let date in data.cases) {
        if (lastDataPoint) { 
            const newDataPoint = { 
                x: date,
                y: data[casesType][date] - lastDataPoint
                //need to know the difference between last and current date
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    }
    return chartData
}

function LineGraph({ casesType, ...props }) {
    const [data, setData] = useState({});
    //API call for last 120 days of data  "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

   

    useEffect(() => {
        const fetchData = async () => { 
         await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(resp => resp.json())
        .then(data => { 
            console.log(data)
            let chartData = buildChartData(data, casesType)
            setData(chartData)
        })
        }
        fetchData()      
    }, [casesType]);

    
    
    return (
        //
        <div className={props.className}>            
            {data?.length > 0 && ( 
                <Line  
                options={options}
                data={{ 
                    datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data:data,
                        }]
                }} /> 

            )}
                
        </div>
    )
}

export default LineGraph
