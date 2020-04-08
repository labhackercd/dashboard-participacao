import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Chart } from "react-google-charts";
import Box from '@material-ui/core/Box'
import { CSVLink} from "react-csv";
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {dataEstadosGeral, dataEstados1, dataEstados2, dataEstados3, dataEstados4} from './data'


const dataEstados = [
    dataEstadosGeral,
    dataEstados1,
    dataEstados2,
    dataEstados3,
    dataEstados4
]

const audiencesList = [
    { title: 'PEC 199/19 - PRISÃO EM 2ª INSTÂNCIA', id: 1 },
    { title: 'PLP 146/19 - STARTUPS', id: 2 },
    { title: 'CENTRO DE ESTUDOS E DEBATES ESTRATÉGICOS', id: 3 },
    { title: 'PL 0399/15 - MEDICAMENTOS FORMULADOS COM CANNABIS', id: 4 },
]

class AudienciasParticipationUsersBrazilMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: "Geral",
          radioGroupValue: "0",
          data: dataEstados[0]
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);  
        this.handleAutoCompleteChange = this.handleAutoCompleteChange.bind(this);  
    }

    handleAutoCompleteChange(event,values){
        if(values===null){
            this.setState({data:dataEstados[0], title:"Geral"})
        }else{
            this.setState({data:dataEstados[values.id], title:values.title})
        }   
    }

    handleRadioChange(event){
        this.setState({radioGroupValue:event.target.value})
        this.setState({data:dataEstados[0], title:"Geral"})
    }

  render() {
    const radioGroupValue = this.state.radioGroupValue;

    return (
        <Paper>
            <Box mb={2}>
                <Grid container>
                    <Grid item xs={8}>
                        <Box ml={3} mt={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Desejar ver o mapa sobre dados</FormLabel>
                                        <RadioGroup row aria-label="position" name="position" defaultValue="0" onChange={this.handleRadioChange}>
                                            <FormControlLabel value="0" control={<Radio color="primary" />} label="Total Geral" />
                                            <FormControlLabel value="1" control={<Radio color="primary" />} label="Pesquisar por evento" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                    {radioGroupValue === "1" && (
                                        <Autocomplete
                                            id="audience-auto-complete"
                                            options={audiencesList}
                                            onChange={this.handleAutoCompleteChange}
                                            getOptionLabel={(option) => option.title}
                                            renderInput={(params) => <TextField {...params} label="Pesquise por uma audiência, reunião, seminário..." />}
                                        />
                                        )
                                    }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
    
                    </Grid>
                    
                    <Grid item xs={4}>
                        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                            <CSVLink data={this.state.data} filename={"participacao-usuarios-estado-audiencias-"+this.state.title+".csv"} className="btn btn-primary">Exportar csv</CSVLink>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" ></Divider>

            <Box marginY={2} display="flex" justifyContent="center" >
                <Typography variant="h5" gutterBottom>Número de usuários que participaram por estado {this.state.title}</Typography>
            </Box>
            
            <Box mb={5} alignItems="center">
                <Chart
                    chartType="GeoChart"
                    data={this.state.data}
                    
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