import React, { Component } from 'react';
import { GoogleProvider } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import WikilegisLastWeek from '../../components/WikilegisLastWeek'
import WikilegisLastMonth from '../../components/WikilegisLastMonth'
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
          <WikilegisLastMonth
            views={views}
            title={'Wikilegis - últimos 30 dias'}
          />
        );
      case 'week':
        return (
          <WikilegisLastWeek
            views={views}
            title={'Wikilegis - últimos 7 dias'}
          />
        );
      default:
        return (
          <WikilegisLastMonth
            views={views}
            title={'Wikilegis - últimos 30 dias'}
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