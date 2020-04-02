import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Chart } from "react-google-charts";
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";

const dataEstados = [
    ['Estado', 'Número de Usuários'],
    ['BR-AC', 70],
    ['BR-AL', 230],
    ['BR-AP', 200],
    ['BR-AM', 400],
    ['BR-BA', 432],
    ['BR-CE', 239],
    ['BR-DF', 2000],
    ['BR-ES', 432],
    ['BR-GO', 389],
    ['BR-MA', 213],
    ['BR-MT', 193],
    ['BR-MS', 134],
    ['BR-MG', 1096],
    ['BR-PA', 145],
    ['BR-PB', 543],
    ['BR-PR', 406],
    ['BR-PE', 567],
    ['BR-PI', 547],
    ['BR-RJ', 454],
    ['BR-RN', 654],
    ['BR-RS', 765],
    ['BR-RO', 756],
    ['BR-RR', 587],
    ['BR-SC', 305],
    ['BR-SP', 324],
    ['BR-SE', 123],
    ['BR-TO', 398],
]

class AudienciasParticipationUsersBrazilMap extends Component {


  render() {

    return (
      <Paper>
            <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                <CSVLink data={dataEstados} filename={"participacao-usuarios-estado-audiencias.csv"} className="btn btn-primary">Exportar csv</CSVLink>
            </Box>
            <Box marginY={2} display="flex" justifyContent="center" >
                <Typography variant="h5" gutterBottom>Número de usuários que participaram por estado</Typography>
            </Box>
            
            <Box mb={5} alignItems="center">
                <Chart
                    chartType="GeoChart"
                    data={dataEstados}
                    
                    options={{
                        region: 'BR', // Brazil
                        resolution: 'provinces',
                    }}
                />
            </Box>

      </Paper>
    );
  }
}



export default (AudienciasParticipationUsersBrazilMap);