import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend, Tooltip, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';



class AudienciasGenderChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { region: 'Masculino', val: 40000},
        { region: 'Feminino', val: 45000 },
      ]
    };
  }

  render() {

    return (
      <Paper>
        <Chart
          data={this.state.data}
        >


          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
            name="teste"
          />

          <Title
            text="Gênero dos usuários"
          />
          <EventTracker />
          <Tooltip />
          <Legend />

          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default (AudienciasGenderChart);