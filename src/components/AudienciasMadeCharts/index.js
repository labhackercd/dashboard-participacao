import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";

const data = [
  { month: 'Jan', audienciasTransmitidas: 101, audienciasInterativas: 13, year:'2019' },
  { month: 'Fev', audienciasTransmitidas: 89, audienciasInterativas: 15, year:'2019' },
  { month: 'Mar', audienciasTransmitidas: 107, audienciasInterativas: 20, year:'2019' },
  { month: 'Abr', audienciasTransmitidas: 113, audienciasInterativas: 17, year:'2019' },
  { month: 'Mai', audienciasTransmitidas: 105, audienciasInterativas: 21, year:'2019' },
  { month: 'Jun', audienciasTransmitidas: 91, audienciasInterativas: 22, year:'2019' },
  { month: 'Jul', audienciasTransmitidas: 110, audienciasInterativas: 23, year:'2019' },
  { month: 'Ago', audienciasTransmitidas: 111, audienciasInterativas: 25, year:'2019' },
  { month: 'Set', audienciasTransmitidas: 112, audienciasInterativas: 27, year:'2019' },
  { month: 'Out', audienciasTransmitidas: 111, audienciasInterativas: 30, year:'2019' },
  { month: 'Nov', audienciasTransmitidas: 120, audienciasInterativas: 35, year:'2019' },
  { month: 'Dez', audienciasTransmitidas: 160, audienciasInterativas: 45, year:'2019' },
];
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
const demoStyles = () => ({
  chart: {
    paddingRight: '30px',
  },
});

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);

class AudienciasMadeCharts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;
    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={this.state.data} filename={"audiencias-interativas-realizadas.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart data={chartData} className={classes.chart}>
              <ArgumentScale factory={scalePoint} />
              <ArgumentAxis />
              <ValueAxis />

              <AreaSeries
                name="Audiências transmitidas"
                valueField="audienciasTransmitidas"
                argumentField="month"
                seriesComponent={Area}
              />
              <AreaSeries
                name="Audiências Interativas"
                valueField="audienciasInterativas"
                argumentField="month"
                seriesComponent={Area}
              />
              <Animation />
              <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
              <Title text="Audiências Interativas / Audiências Realizadas" />
            </Chart>
        </Box>

      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Audiências Transmitidas' })(AudienciasMadeCharts);