import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel';

import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import GoogleAnalyticsCharts from '../../components/GoogleAnalyticsCharts'
import FormControl from '@material-ui/core/FormControl';
import { Divider } from '@material-ui/core';

function getCurrentDate() {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`
}

class GoogleAnalyticsFilterForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.state = {
      startDate: '2016-01-01',
      endDate: getCurrentDate(),
      dimension: 'ga:year',
      lineChartData: {
        query: {
          'start-date': '2016-01-01',
          'end-date': 'yesterday',
          'metrics': 'ga:pageviews,ga:sessions',
          'dimensions': 'ga:year',
        },
        chart: {
          'type': 'LINE',
          'options': {
            'title': 'Acessos'
          }
        }
      },
      pieChartData: {
        query: {
          'start-date': '2016-01-01',
          'end-date': 'yesterday',
          'metrics': 'ga:pageviews',
          'dimensions': 'ga:pagePathLevel1',
          'sort': '-ga:pageviews',
          'filters': 'ga:pagePathLevel1!=/',
          'max-results': 4 //number of platforms
        },
        chart: {
          'type': 'PIE',
          'options': {
            'width': '100%',
            'pieHole': 4 / 9,
            'title': 'Tráfego por plataforma'
          }
        }
      },
    };
  }

  handleSubmit(event) {
    this.setState(prevState => ({
      lineChartData: {
        ...prevState.lineChartData,
        query: {
          ...prevState.query,
          'start-date': this.state.startDate,
          'end-date': this.state.endDate,
          'metrics': 'ga:pageviews,ga:sessions',
          'dimensions': this.state.dimension,
        }
      },
      pieChartData: {
        ...prevState.pieChartData,
        query: {
          ...prevState.query,
          'start-date': this.state.startDate,
          'end-date': this.state.endDate,
          'metrics': 'ga:pageviews',
          'dimensions': 'ga:pagePathLevel1',
          'sort': '-ga:pageviews',
          'filters': 'ga:pagePathLevel1!=/',
          'max-results': 4
        }
      }
    }))
    event.preventDefault();
  }

  handleStartDateChange(date) {
    this.setState({ startDate: date.toISOString().split('T')[0] })
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date.toISOString().split('T')[0] })
  }

  handleDimensionChange(event) {
    this.setState({ dimension: event.target.value })
  }

  render() {
    return (
        <Box marginX={2} paddingBottom={2}>
          <Box paddingBottom={2}>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        id="start-date"
                        name="startDate"
                        label="Data inicial"
                        type="date"
                        format="yyyy-MM-dd"
                        variant="inline"
                        value={this.state.startDate}
                        onChange={this.handleStartDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        id="end-date"
                        name="endDate"
                        label="Data final"
                        type="date"
                        format="yyyy-MM-dd"
                        variant="inline"
      
                        value={this.state.endDate}
                        onChange={this.handleEndDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel shrink id="select-label">
                        Intervalo
                      </InputLabel>
                      <Select
                        id="select-label"
                        value={this.state.dimension}
                        onChange={this.handleDimensionChange}
                      >
                        <MenuItem value={'ga:day'}>Diário</MenuItem>
                        <MenuItem value={'ga:yearWeek'}>Semanal</MenuItem>
                        <MenuItem value={'ga:yearMonth'}>Mensal</MenuItem>
                        <MenuItem value={'ga:year'}>Anual</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item justify='flex-end'>
                    <FormControl>
                      <Button id="submit-button" color="blue" variant="contained" type="submit" endIcon={<SearchIcon></SearchIcon>}>
                        Pesquisar
                      </Button>
                    </FormControl>

                  </Grid>

                </Grid>
            </form>
          </Box>
          <Box marginX={2} paddingBottom={1}>
            <GoogleAnalyticsCharts
              views={this.props.views}
              lineChartConfig={this.state.lineChartData}
              pieChartConfig={this.state.pieChartData}
            />
          </Box>

          <Divider></Divider>

        </Box>
    )
  }
}

export default GoogleAnalyticsFilterForm;