import React, { Component } from 'react';
import { GoogleDataChart } from 'react-analytics-widget'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';




class GoogleAnalyticsCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
      <Box>
        
        <Box marginX={2}>
          <Typography variant="subtitle1" gutterBottom>
            {this.props.title ? <Typography variant={"body1"}> {this.props.title} </Typography> : '' }
          </Typography>       
        </Box>
        
          {!this.state.done
            ? <div align="center"> <CircularProgress></CircularProgress> </div>
            : ''
          }
          <Box paddingX={3} marginX={4} display={!this.state.done ? 'none' : 'block'}>
            <Grid container >
              <Grid item xs={12} md={6} zeroMinWidth>
                <GoogleDataChart views={this.props.views} config={this.props.lineChartConfig} />
              </Grid>
              <Grid item xs={12} md={6}>
                <GoogleDataChart views={this.props.views} config={this.props.pieChartConfig} />
              </Grid>
            </Grid>
          </Box>
       
      </Box>
    )
  }
}

export default GoogleAnalyticsCharts;