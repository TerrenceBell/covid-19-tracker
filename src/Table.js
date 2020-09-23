import React from 'react';
import './Table.css';
import numeral from "numeral";

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => ( 
                <tr> 
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}
//A use of destruring of the country obj and take an individual value

export default Table
