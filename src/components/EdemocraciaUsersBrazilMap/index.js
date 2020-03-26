import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Chart } from "react-google-charts";



class EdemocraciaUsersBrazilMap extends Component {


  render() {

    return (
      <Paper>
            <Typography>Número de votos por estado</Typography>
            <Chart
            chartType="GeoChart"
            data={[
                ['State', 'Votos'],
                ['BR-DF', 100],
                ['BR-SP', 300],
                ['BR-PE', 350],
                ['BR-AM', 400],
                ['BR-BA', 500],
                ['BR-RN', 600],
                ['BR-ES', 700],
                ['BR-RJ', 550],
                ['BR-MG', 450],
                ['BR-GO', 250],
            ]}
            
            options={{
                region: 'BR', // Western Europe
                resolution: 'provinces',
            }}
            />
      </Paper>
    );
  }
}

export default (EdemocraciaUsersBrazilMap);