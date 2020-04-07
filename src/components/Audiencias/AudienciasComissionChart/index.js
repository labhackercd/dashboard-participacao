import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Title, BarSeries, Chart, ArgumentAxis, ValueAxis, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from '@devexpress/dx-react-chart';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";


class AudienciasComissionChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { room: "CSSF", messages: 2032},
        { room: "SUBLIBRAS", messages: 425},
        { room: "CE" , messages: 765},
        { room: "CTASP", messages: 332},
      ]
    };
  }

  render() {

    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={this.state.data} filename={"comissoes-virtual-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart data={this.state.data}> 
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
}

export default (AudienciasComissionChart);