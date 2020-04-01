import React, { Component } from 'react';
import { GoogleProvider } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import GoogleAnalyticsFilterForm from '../../components/GoogleAnalyticsFilterForm'
import GoogleAnalyticsCharts from '../../components/GoogleAnalyticsCharts'
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import { GOOGLE_ANALYTICS_URL_TOKEN } from '../../config_constants'

const last7days = {
  reportType: 'ga',
  query: {
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'start-date': '7daysAgo',
    'end-date': 'yesterday',
    'filters': 'ga:pagePath=@/wikilegis/p/',
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
    'dimensions': 'ga:pagePathLevel3',
    'sort': '-ga:pageviews',
    'filters': 'ga:pagePath=@/wikilegis/p/',
    'max-results': 10 //number of platforms
  },
  chart: {
    'type': 'PIE',
    'options': {
      'width': '100%',
      'pieHole': 4 / 9,
      'title': 'Top 10 projetos'
    }
  }
}

const last30days = {
  reportType: 'ga',
  query: {
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'filters': 'ga:pagePath=@/wikilegis/p/',
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
    'dimensions': 'ga:pagePathLevel3',
    'sort': '-ga:pageviews',
    'filters': 'ga:pagePath=@/wikilegis/p/',
    'max-results': 10
  },
  chart: {
    'type': 'PIE',
    'options': {
      'width': '100%',
      'pieHole': 4 / 9,
      'title': 'Top 10 projetos'
    }
  }
}

const dynamicLineChart = {
  reportType: 'ga',
  query: {
    'start-date': '2019-09-02',
    'end-date': 'yesterday',
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'filters': 'ga:pagePath=@/wikilegis/p/',
  },
  chart: {
    type: 'LINE',
    options: {
      'title': 'Acessos'
    }
  }
}

const dynamicPieChart = {
  query: {
    'start-date': '2019-09-02',
    'end-date': 'yesterday',
    'metrics': 'ga:pageviews',
    'dimensions': 'ga:pagePathLevel3',
    'sort': '-ga:pageviews',
    'filters': 'ga:pagePath=@/wikilegis/p/',
    'max-results': 10
  },
  chart: {
    'type': 'PIE',
    'options': {
      'width': '100%',
      'pieHole': 4 / 9,
      'title': 'Top 10 projetos'
    }
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:125230257"
  }
}

export default class WikilegisAnalyticsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      isLoading: true,
      gaMetricsSwitch: 'month'
    };
    this.handleMetricsSwitchChange = this.handleMetricsSwitchChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(GOOGLE_ANALYTICS_URL_TOKEN); // Alterar pela URL válida 
      const json = await response.json();
      this.setState({ token: json.token, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleMetricsSwitchChange(event) {
    this.setState({ gaMetricsSwitch: event.target.value })
  }

  renderGoogleAnalyticsSwitch() {
    switch (this.state.gaMetricsSwitch) {
      case 'month':
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={'Wikilegis - últimos 30 dias'}
            lineChartConfig={last30days}
            pieChartConfig={trafficByPlatformLast30Days}
          />
        );
      case 'week':
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={'Wikilegis - últimos 7 dias'}
            lineChartConfig={last7days}
            pieChartConfig={trafficByPlatformLast7Days}
          />
        );
      case 'filter':
        return (
          <GoogleAnalyticsFilterForm
            views={views}
            lineChartConfig={dynamicLineChart}
            pieChartConfig={dynamicPieChart}
            startDate='2019-09-01'
          />
        );
      default:
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={'Wikilegis - últimos 30 dias'}
            lineChartConfig={last30days}
            pieChartConfig={trafficByPlatformLast30Days}
          />
        );
    }
  }

  render() {
    const loading = this.state.isLoading

    if (loading) {
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    } else {
      return (
        <ResponsiveDrawer title='Analytics Wikilegis'>
          <GoogleProvider accessToken={this.state.token}>
            <Paper>
              <Box paddingY={3} paddingX={2} spacing={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InputLabel id="select-label">Visualizar por</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={this.state.gaMetricsSwitch}
                      onChange={this.handleMetricsSwitchChange}
                    >
                      <MenuItem value={'month'}>Últimos 30 dias</MenuItem>
                      <MenuItem value={'week'}>Últimos 7 dias</MenuItem>
                      <MenuItem value={'filter'}>Seleção de período</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Box>

              <Divider variant="middle"></Divider>

              <Box spacing={2} paddingTop={2}>
                {this.renderGoogleAnalyticsSwitch()}
              </Box>
            </Paper>
          </GoogleProvider>
        </ResponsiveDrawer >
      )
    }
  }
}