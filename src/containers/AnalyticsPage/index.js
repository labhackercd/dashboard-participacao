import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

// graph 1 config q   
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

// graph 1 config
const last30days = {
  reportType: 'ga',
  query: {
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'start-date': '30daysAgo',
    'end-date': 'yesterday'
  },
  chart: {
    type: 'LINE',
    options: {
      'title': 'Acessos nos últimos 30 dias'
    }
  }
}

const trafficByPlatformLast30Days = {
  query: {
    'start-date': '30daysAgo',
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
      'title': 'Tráfego por plataforma nos últimos 30 dias'
    }
  }
}

// graph 2 config
const last7days = {
  reportType: 'ga',
  query: {
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'start-date': '7daysAgo',
    'end-date': 'yesterday'
  },
  chart: {
    type: 'LINE',
    options: {
      'title': 'Acessos nos últimos 7 dias'
    }
  }
}


const trafficByPlatformLast7Days = {
  query: {
    'start-date': '7daysAgo',
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
      'title': 'Tráfego por plataforma nos últimos 7 dias'
    }
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:125230257"
  }
}

function getCurrentDate() {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`
}

export default class AnalyticsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      startDate: '2016-01-01',
      endDate: getCurrentDate(),
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000'); // Alterar pela URL válida 
      const json = await response.json();
      this.setState({ token: json.token });
    } catch (error) {
      console.log(error);
    }
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
          'dimensions': 'ga:yearMonth',
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

  render() {
    return (
      <ResponsiveDrawer title='Dashboard'>
        <GoogleProvider accessToken={this.state.token}>
          <h2> E-democracia - últimos 30 dias </h2>
          <Paper>
            <Box m={1}>
              <Grid container>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={last30days} />
                </Grid>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={trafficByPlatformLast30Days} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <h2> E-democracia - últimos 7 dias </h2>
          <Paper>
            <Box m={1}>
              <Grid container>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={last7days} />
                </Grid>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={trafficByPlatformLast7Days} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <h2> Selecione o período para consulta </h2>
          <form onSubmit={this.handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                id="start-date"
                name="startDate"
                label="Start Date"
                type="date"
                format="yyyy-MM-dd"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <DatePicker
                id="end-date"
                name="endDate"
                label="End Date"
                type="date"
                format="yyyy-MM-dd"
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MuiPickersUtilsProvider>
            <input type="submit" value="Enviar" />
          </form>
          <Paper>
            <Box m={1}>
              <Grid container>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={this.state.lineChartData} />
                </Grid>
                <Grid item xs={6}>
                  <GoogleDataChart views={views} config={this.state.pieChartData} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </GoogleProvider>
      </ResponsiveDrawer >
    )
  }
}