import React, { Component } from 'react';
import { GoogleDataChart } from 'react-analytics-widget'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

class GoogleAnalyticsCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lineChartConfig !== this.props.lineChartConfig) {
      this.setState({ done: undefined });
      setTimeout(() => {
        this.setState({ done: true });
      }, 1000);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ done: true });
    }, 2500);
  }

  render() {

    return (
      <div>
        {this.props.title
          ? <h2> {this.props.title} </h2>
          : ''
        }
        
          {!this.state.done
            ? <div align="center"> <CircularProgress></CircularProgress> </div>
            : ''
          }
          <Box paddingX={2} display={!this.state.done ? 'none' : 'block'}>
            <Grid container>
              <Grid item xs={6}>
                <GoogleDataChart views={this.props.views} config={this.props.lineChartConfig} />
              </Grid>
              <Grid item xs={6}>
                <GoogleDataChart views={this.props.views} config={this.props.pieChartConfig} />
              </Grid>
            </Grid>
          </Box>
       
      </div>
    )
  }
}

export default GoogleAnalyticsCharts;