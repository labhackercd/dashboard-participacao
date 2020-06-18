import React, {useState} from 'react';
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

export default function AudienciasParticipationUsersBrazilMap (props) {
  let [radioGroupValue, setRadioGroupValue] = useState("0")
  let [title, setTitle] = useState("Total Geral")
  let [dataEstados] = useState(props.data.dataEstados)
  let [audiencesList] = useState(props.data.audiencesList)
  let [data, setData] = useState(dataEstados[0])

  function handleAutoCompleteChange(event, values) {
    if(values == null) {
      setData(dataEstados[0])
      setTitle("Total Geral")
    } else {
      setData(dataEstados[values.id])
      setTitle(values.title)
    }
  }

  function handleRadioChange(event) {
    setRadioGroupValue(event.target.value)
    setData(dataEstados[0])
    setTitle("Total Geral")
  }

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
                                  <RadioGroup row aria-label="position" name="position" defaultValue="0" onChange={handleRadioChange}>
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
                                      onChange={handleAutoCompleteChange}
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
                      <CSVLink data={data} filename={"participacao-usuarios-estado-audiencias-"+ {title} +".csv"} className="btn btn-primary">Exportar csv</CSVLink>
                  </Box>
              </Grid>
          </Grid>
      </Box>

      <Divider variant="middle" ></Divider>

      <Box marginY={2} display="flex" justifyContent="center" >
          <Typography variant="h5" gutterBottom>Número de usuários que participaram por estado ({title})</Typography>
      </Box>
      
      <Box mb={5} alignItems="center">
          <Chart
              chartType="GeoChart"
              data={data}
              options={{
                  region: 'BR', // Brazil
                  resolution: 'provinces',
              }}
          />
      </Box>
  </Paper>    
  )
}