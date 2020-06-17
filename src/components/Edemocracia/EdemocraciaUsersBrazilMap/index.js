import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Chart } from "react-google-charts";
import Box from '@material-ui/core/Box'

export default function EdemocraciaUsersBrazilMap(props) {
  return (
    <Paper>
        <Box mb={5} justifyContent="center">
            <Typography>Número de usários cadastrados por estado</Typography>
        </Box>
        <Box mb={5} alignItems="center">
            <Chart
                chartType="GeoChart"
                data={props.data}
                options={{
                    region: 'BR', // Western Europe
                    resolution: 'provinces',
                }}
            />
        </Box>
    </Paper>   
  )
}