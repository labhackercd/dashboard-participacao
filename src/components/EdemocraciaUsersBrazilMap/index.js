import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Chart } from "react-google-charts";
import Box from '@material-ui/core/Box'


class EdemocraciaUsersBrazilMap extends Component {


  render() {

    return (
      <Paper>
            <Box mb={5} justifyContent="center">
                <Typography>Número de usários cadastrados por estado</Typography>
            </Box>
            
            <Box mb={5} alignItems="center">
                <Chart
                    chartType="GeoChart"
                    data={[
                        ['State', 'Usuários'],
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
            </Box>

      </Paper>
    );
  }
}

export default (EdemocraciaUsersBrazilMap);