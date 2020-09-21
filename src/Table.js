import React from 'react'
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => ( 
                <tr> 
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}
//A use of destruring of the country obj and take an individual value

export default Table
