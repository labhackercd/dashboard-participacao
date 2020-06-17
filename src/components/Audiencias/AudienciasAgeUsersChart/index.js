import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
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
  <ValueAxis.Label {...props} text={`${Math.abs(text)}`} />
);

export default function AudienciasAgeUsersChart (props){
  const data = props.data
  return (
     <Paper>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <CSVLink data={data} filename={"idade-usuarios-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
        </Box>
        <Chart
          data={data}
          rotated
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueScale />
          <ValueAxis labelComponent={Label} />

          <BarSeries
            name="Masculino"
            valueField="male"
            argumentField="age"
            color="#3F7FBF"
          />
          <BarSeries
            name="Feminino"
            valueField="female"
            argumentField="age"
            color="#F87CCC"
          />
          <Title text="Faixa etária dos usuários por genêro" />
          <Animation />
          <EventTracker />
          <Tooltip />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
        </Chart>
      </Paper>    
    )
  }