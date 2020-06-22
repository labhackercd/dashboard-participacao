import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import GoogleAnalyticsCharts from '../GoogleAnalyticsCharts'
import FormControl from '@material-ui/core/FormControl';
import { Divider } from '@material-ui/core';

function getCurrentDate() {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`
}

class GoogleAnalyticsFilterForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.state = {
      startDate: props.startDate,
      endDate: getCurrentDate(),
      dimension: 'ga:year',
      lineChartData: props.lineChartConfig,
      pieChartData: props.pieChartConfig,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let lineChartQueryData = this.state.lineChartData['query'];
    let pieChartQueryData = this.state.pieChartData['query'];
    lineChartQueryData['start-date'] = this.state.startDate;
    lineChartQueryData['end-date'] = this.state.endDate;
    lineChartQueryData['dimensions'] = this.state.dimension;
    pieChartQueryData['start-date'] = this.state.startDate;
    pieChartQueryData['end-date'] = this.state.endDate;
    this.setState(prevState => ({
      lineChartData: {
        ...prevState.lineChartData,
        query: lineChartQueryData
      },
      pieChartData: {
        ...prevState.pieChartData,
        query: pieChartQueryData
      }
    }))
  }

  handleStartDateChange(date) {
    
    if(!isNaN(date)){
      this.setState({ startDate: date.toISOString().split('T')[0] })
    }else{
      // Nothing to do
    }
    
  }

  handleEndDateChange(date) {
    
    if(!isNaN(date)){
      this.setState({ endDate: date.toISOString().split('T')[0] })
    }else{
      // Nothing to do
    }

  }

  handleDimensionChange(event) {
    this.setState({ dimension: event.target.value })
  }

  render() {
    return (
      <Box marginX={1} paddingBottom={2}>
        <Box>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="start-date"
                    name="startDate"
                    label="Data inicial"
                    format="dd/MM/yyyy"      
                    variant="inline"
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="end-date"
                    name="endDate"
                    label="Data Final"
                    format="dd/MM/yyyy"    
                    variant="inline"
                    value={this.state.endDate}
                    onChange={this.handleEndDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12} justify='flex-end'>
                <FormControl>
                  <Button id="submit-button" color="default" variant="contained" type="submit" endIcon={<SearchIcon></SearchIcon>}>
                    Pesquisar
                      </Button>
                </FormControl>

              </Grid>

            </Grid>
          </form>
        </Box>
        <Box container="true" paddingBottom={2}>
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

class GoogleAnalyticsDynamicCharts extends Component {
  constructor(props) {
    super(props)
    this.addAnotherChart = this.addAnotherChart.bind(this);
    this.state = {
      ChartRows: [
        <GoogleAnalyticsFilterForm
          views={this.props.views}
          lineChartConfig={this.props.lineChartConfig}
          pieChartConfig={this.props.pieChartConfig}
          startDate={this.props.startDate}
        />
      ]
    }
  }

  addAnotherChart() {
    this.setState({
      ChartRows: [...this.state.ChartRows, React.cloneElement(this.state.ChartRows[0])]
    })
  }

  render() {
    const charts = this.state.ChartRows.map(function (chart) {
      return <Grid item xs={12} zeroMinWidth> {chart} </Grid>;
    });
    return (
      <Box >
        <Grid container spacing={1}>
          {charts}
        </Grid>
        <Box display="flex" justifyContent="center" paddingBottom={1} >
          <Button
            variant="contained"
            color="primary"
            onClick={this.addAnotherChart}
          >
            Adicionar novo gráfico
          </Button>
        </Box>

      </Box>
    )
  }
}

export default GoogleAnalyticsDynamicCharts;