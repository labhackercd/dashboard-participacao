import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Title, Legend, BarSeries, PieSeries, Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";





class AudienciasComissionChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { room: "CSSF", messages: 2032},
        { room: "SUBLIBRA", messages: 425},
        { room: "CE" , messages: 765},
        { room: "CTASP", messages: 332},
      ]
    };
  }

  render() {

    return (
      <Paper>
        <Chart
            data={this.state.data}
          > 
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="messages" argumentField="room" />
            <Title text="Mensagens por Comissão Virtual" />
          </Chart>
      </Paper>
    );
  }
}

export default (AudienciasComissionChart);