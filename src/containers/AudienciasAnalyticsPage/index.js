import React, { Component } from 'react';
import { GoogleProvider } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import GoogleAnalyticsFilterForm from '../../components/GoogleAnalyticsFilterForm'
import AudienciasLastWeek from '../../components/AudienciasLastWeek'
import AudienciasLastMonth from '../../components/AudienciasLastMonth'
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

export default class AnalyticsPage extends Component {
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
          <AudienciasLastMonth
            views={views}
            title={'Audiências Interativas - últimos 30 dias'}
          />
        );
      case 'week':
        return (
          <AudienciasLastWeek
            views={views}
            title={'Audiências Interativas - últimos 7 dias'}
          />
        );
      default:
        return (
          <AudienciasLastMonth
            views={views}
            title={'Audiências Interativas - últimos 30 dias'}
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