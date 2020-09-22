import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'

function infoBox({title, cases, total}) {
    return (
     <Card className="infobox"> 
         <CardContent> 
             {/* title */}
             <Typography color="textSecondary">{title}</Typography>

             {/* number of cases */}
             <h2 className="infobox__cases">{cases}</h2>

             {/* total */}
             <Typography className="infobox__title" color="textSecondary">{total} Total</Typography>
         </CardContent>
     </Card>
    )
}

export default infoBox
