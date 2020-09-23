import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'

function infoBox({title, cases, isRed, active, total, ...props}) {
    return (
     <Card onClick={props.onClick} className={`infobox ${active && "infobox--selected"} ${isRed && 'infobox--red'}`}> 
         <CardContent> 
             {/* title */}
             <Typography color="textSecondary">{title}</Typography>

             {/* number of cases */}
             <h2 className={`"infobox__cases" ${!isRed && "infobox__cases--green"}`}>{cases}</h2>

             {/* total */}
             <Typography className="infobox__title" color="textSecondary">{total} Total</Typography>
         </CardContent>
     </Card>
    )
}

export default infoBox
//bem