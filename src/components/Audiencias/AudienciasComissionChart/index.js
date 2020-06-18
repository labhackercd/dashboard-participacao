import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Title, BarSeries, Chart, ArgumentAxis, ValueAxis, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from '@devexpress/dx-react-chart';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";

function AudienciasComissionChart (props) {
    const data = props.data 
    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={data} filename={"comissoes-virtual-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart data={data}> 
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField="messages" argumentField="room" />
              <Title text="Mensagens por Comissão" />
              <EventTracker />
              <Tooltip />
            </Chart>
        </Box>
      </Paper>
    );  
}

export default (AudienciasComissionChart);