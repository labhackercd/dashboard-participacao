import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend, Tooltip, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";

function AudienciasTypeChart (props) {
    const data = props.data 
    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={data} filename={"usuarios-genero-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart data={data}>
              <PieSeries
                valueField="val"
                argumentField="region"
                innerRadius={0.6}
                name="teste"
              />
              <Title
                text="Tipo dos Eventos"
              />
              <EventTracker />
              <Tooltip />
              <Legend />
              <Animation />
            </Chart>
        </Box>
      </Paper>      
    )
}

export default AudienciasTypeChart