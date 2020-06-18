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


const data = [
  { year: '2015', users: 1.000 },
  { year: '2016', users: 2.000 },
  { year: '2017', users: 10.000 },
  { year: '2018', users: 20.000 },
  { year: '2019', users: 50.000 },
  { year: '2020', users: 80.000 },
];

export default class AudienciasUserChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink data={chartData} filename={"usuarios-cadastrados-ano-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart
              data={chartData}
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
}
