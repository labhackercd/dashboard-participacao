import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';

export default function EdemocraciaUserChart(props) {
  return (
    <Paper>
      <Chart data={props.data}>
        <ArgumentAxis />
        <ValueAxis max={7} />
        <BarSeries
          valueField="users"
          argumentField="year" />
        <Title text="Número de usuários cadastrados" />
        <EventTracker />
        <Tooltip/>
        <Animation />
      </Chart>
    </Paper>
  )
}