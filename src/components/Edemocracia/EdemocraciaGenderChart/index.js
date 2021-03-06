import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, Legend, Tooltip, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

export default function EdemocraciaGenderChart (props) {
  const data = props.data 
  return (
    <Paper>
       <Chart data={data}>
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
            name="teste" />
          <Title
            text="Gênero dos usuários" />
          <EventTracker />
          <Tooltip />
          <Legend />
          <Animation />
        </Chart>
    </Paper>
  )
}