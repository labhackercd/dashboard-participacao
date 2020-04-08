import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { scalePoint } from 'd3-scale';
import { EventTracker } from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
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
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class AudienciasMadeCharts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data2:data,
    };
  }

  render() {
    const { data2: chartData } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={chartData} filename={"audiencias-interativas-realizadas.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Box>
            <Chart
                data={chartData}
                className={classes.chart}
              >
                <ArgumentScale factory={scalePoint} />
                <ArgumentAxis />
                <ValueAxis
                />
                <LineSeries
                  name="Audiências com transmissão comum"
                  valueField="audienciasTransmitidas"
                  argumentField="month"
                />
                <LineSeries
                  name="Audiências com transmissão interativa"
                  valueField="audienciasInterativas"
                  argumentField="month"
                />
                <EventTracker />
                <Tooltip/>
                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                <Title
                  text={"Audiências com transmissão comum x Audiências com transmissão interativa"}
                  textComponent={TitleText}
                />
                <Animation />
            </Chart>
        </Box>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'AudienciasMadeCharts' })(AudienciasMadeCharts);