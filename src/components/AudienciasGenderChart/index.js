import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Legend } from '@devexpress/dx-react-chart';


class AudienciasGenderChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { region: 'Homem', val: 40000 },
        { region: 'Mulheres', val: 45000 },
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
            text="Gênero dos usuários da Plataforma"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default (AudienciasGenderChart);