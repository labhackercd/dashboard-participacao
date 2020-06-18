import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";


export default function AudienciasUserChart (props) {
  const data = props.data 
    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink data={data} filename={"usuarios-cadastrados-ano-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart
              data={data}
            >
              <ArgumentAxis />
              <ValueAxis max={7} />
              
              <BarSeries
                valueField="users"
                argumentField="year"
              />
              <Title text="Usuários Cadastrados / Ano" />
              <EventTracker />
              <Tooltip/>
              <Animation />
            </Chart>
        </Box>

      </Paper>
    );  
}