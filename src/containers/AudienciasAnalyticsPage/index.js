import React, { Component } from 'react';
import { GoogleProvider } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import GoogleAnalyticsCharts from '../../components/GoogleAnalyticsCharts'
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const last30days = {
  reportType: 'ga',
  query: {
    'dimensions': 'ga:date',
    'metrics': 'ga:pageviews,ga:sessions',
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
    'filters': 'ga:pagePathLevel1=@/audiencias',
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
    'filters': 'ga:pagePathLevel1=@/audiencias',
    'max-results': 10 //number of platforms
  },
  chart: {
    'type': 'PIE',
    'options': {
      'width': '100%',
      'pieHole': 4 / 9,
      'title': 'Top 10 audiências'
    }
  }
}

const last7days = {
  reportType: 'ga',
  query: {
    'dimensions': 'ga:dayOfWeekName',
    'metrics': 'ga:pageviews,ga:sessions',
    'start-date': '7daysAgo',
    'end-date': 'yesterday',
    'filters': 'ga:pagePathLevel1=@/audiencias',
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
    'filters': 'ga:pagePathLevel1=@/audiencias',
    'max-results': 10 //number of platforms
  },
  chart: {
    'type': 'PIE',
    'options': {
      'width': '100%',
      'pieHole': 4 / 9,
      'title': 'Top 10 audiências'
    }
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:125230257"
  }
}

export default class AudienciasAnalyticsPage extends Component {
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
      const response = await fetch('http://localhost:5000'); // Alterar pela URL válida 
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
            title={'Audiências Interativas - últimos 30 dias'}
            lineChartConfig={last30days}
            pieChartConfig={trafficByPlatformLast30Days}
          />
        );
      case 'week':
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={'Audiências Interativas - últimos 7 dias'}
            lineChartConfig={last7days}
            pieChartConfig={trafficByPlatformLast7Days}
          />
        );
      default:
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={'Audiências Interativas - últimos 30 dias'}
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
        <ResponsiveDrawer title='Analytics Audiências Interativas'>
          <GoogleProvider accessToken={this.state.token}>
            <InputLabel id="select-label">Visualizar por</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={this.state.gaMetricsSwitch}
              onChange={this.handleMetricsSwitchChange}
            >
              <MenuItem value={'month'}>Últimos 30 dias</MenuItem>
              <MenuItem value={'week'}>Últimos 7 dias</MenuItem>
            </Select>
            {this.renderGoogleAnalyticsSwitch()}
          </GoogleProvider>
        </ResponsiveDrawer >
      )
    }
  }
}