import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});

const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

class PautaVoteParticipationChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          pauta: 'Autônomo exclusivo', infavor: 96, against: 56,
        }, {
          pauta: 'Auxílio-doença', against: 10, infavor: 176,
        }, {
          pauta: 'Hepatites B e C', against: 15, infavor: 100,
        }, {
          pauta: 'Demissão por alcoolismo', infavor: 60, against: 58,
        }, {
          pauta: 'Regras de estágio', infavor: 127, against: 33,
        }]
    };
  }

  render() {

    return (
      <Paper>
        <Chart
          data={this.state.data}>
          <ArgumentAxis />
          <ValueAxis
            max={2400}/>

          <BarSeries
            name="A favor"
            valueField="infavor"
            argumentField="pauta"
          />
          <BarSeries
            name="Contra"
            valueField="against"
            argumentField="pauta"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Votos por pauta para a Comissão de Trabalho, Administração e Serviço Público " />
          <Stack
            stacks={[
              { series: ['infavor', 'against'] },
            ]}
          />
        </Chart>
      </Paper>
    );
  }
}

export default PautaVoteParticipationChart;