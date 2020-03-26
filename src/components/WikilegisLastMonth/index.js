import React, { Component } from 'react';
import { GoogleDataChart } from 'react-analytics-widget'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

class WikilegisLastMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ done: true });
    }, 2500);
  }
  render() {
    const last30days = {
      reportType: 'ga',
      query: {
        'dimensions': 'ga:date',
        'metrics': 'ga:pageviews,ga:sessions',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
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
    return (
      <div>
        {this.props.title
          ? <h2> {this.props.title} </h2>
          : ''
        }
        <Paper>
          {!this.state.done
            ? <div align="center"> <CircularProgress></CircularProgress> </div>
            : ''
          }
          <Box m={1} display={!this.state.done ? 'none' : 'block'}>
            <Grid container>
              <Grid item xs={6}>
                <GoogleDataChart views={this.props.views} config={last30days} />
              </Grid>
              <Grid item xs={6}>
                <GoogleDataChart views={this.props.views} config={trafficByPlatformLast30Days} />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
    )
  }
}

export default WikilegisLastMonth;