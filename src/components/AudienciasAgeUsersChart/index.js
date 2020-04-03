import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

import {
  Animation,
  ArgumentScale,
  ValueScale,
} from '@devexpress/dx-react-chart';
import { scaleBand } from 'd3-scale';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";

const legendStyles = {
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
};
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
  },
});
const legendItemStyles = {
  item: {
    flexDirection: 'column',
  },
};

const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const LegendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
);
const LegendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);
const LegendItem = withStyles(legendItemStyles, { name: 'LegendItem' })(LegendItemBase);

const Label = ({ text, ...props }) => (
  <ValueAxis.Label {...props} text={`${Math.abs(text)}%`} />
);
const modifyDomain = ([start, end]) => {
  const threshold = Math.ceil(Math.max(Math.abs(start), Math.abs(end)));
  return [-threshold, threshold];
};

const populationPyramid = [
 {
    age: '10-20',
    male: -4.0,
    female: 3.8,
  }, {
    age: '21-30',
    male: -3.9,
    female: 3.7,
  }, {
    age: '31-40',
    male: -4.0,
    female: 3.8,
  }, {
    age: '41-50',
    male: -4.0,
    female: 3.8,
  }, {
    age: '51-60',
    male: -3.5,
    female: 3.4,
  }, {
    age: '61-70',
    male: -3.2,
    female: 3.1,
  }, {
    age: '71-80',
    male: -3.1,
    female: 3.1,
  }, {
    age: '81-90',
    male: -2.8,
    female: 2.8,
  }, {
    age: '91-100',
    male: -2.4,
    female: 2.5,
  }, {
    age: '100+',
    male: -2.0,
    female: 2.1,
  }
  ];

export default class AudienciasAgeUsersChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: populationPyramid,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={this.state.data} filename={"idade-usuarios-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Chart
          data={chartData}
          rotated
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueScale modifyDomain={modifyDomain} />
          <ValueAxis labelComponent={Label} />

          <BarSeries
            name="Homem"
            valueField="male"
            argumentField="age"
            color="#3F7FBF"
          />
          <BarSeries
            name="Mulheres"
            valueField="female"
            argumentField="age"
            color="#F87CCC"
          />
          <Title text="Faixa etária dos usuários por genêro" />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
        </Chart>
      </Paper>
    );
  }
}