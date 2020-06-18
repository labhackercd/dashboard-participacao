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

export default function PautaVoteParticipationChart(props) {
  return (
     <Paper>
        <Chart
          data={props.data}>
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
  )
}