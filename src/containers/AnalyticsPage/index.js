import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';


// graph 1 config
const last30days = {
    reportType: "ga",
    query: {
        dimensions: "ga:date",
        metrics: "ga:pageviews,ga:sessions",
        "start-date": "30daysAgo",
        "end-date": "yesterday"
    },
    chart: {
        type: "LINE",
        options: {
            // options for google charts
            // https://google-developers.appspot.com/chart/interactive/docs/gallery
            title: "Last 30 days pageviews"
        }
    }
}

// graph 2 config
const last7days = {
    reportType: "ga",
    query: {
        dimensions: "ga:date",
        metrics: "ga:pageviews, ga:sessions",
        "start-date": "7daysAgo",
        "end-date": "yesterday"
    },
    chart: {
        type: "LINE"
    }
}

const trafficByPlatformLast30Days =  {
  query: {
      'start-date': "30daysAgo",
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
      }
  }
}

const trafficByPlatformLast7Days =  {
  query: {
      'start-date': '7daysAgo',
      'end-date': 'yesterday',
      'metrics': 'ga:pageviews, ga:pagePathLevel1',
      'dimensions': 'ga:date',
      'sort': '-ga:pageviews',
      'filters': 'ga:pagePathLevel1!=/',
      'max-results': 4 //number of platforms
  },
  chart: {
      'type': 'LINE',
      // 'options': {
      //     'width': '100%',
      //     'pieHole': 4 / 9,
      // }
  }
}

const trafficByPlatformOverYears =  {
  query: {
    'start-date' : '2016-01-01', 
    'end-date': 'yesterday',
    'metrics': 'ga:sessions', 
    'dimensions': 'ga:year',
  }, 
  chart: {
    'type': 'LINE',
  }
}
// analytics views ID
const views = {
    query: {
        ids: "ga:125230257"
    }
}

export default class AnalyticsPage extends Component {
    constructor(props) {
        super(props)
        this.state = { token: "ya29.c.Ko4BwgdDQ9YdZjpnOsXbwPyoinoCs98Zi5wGek40kUJqW7VDt0gPODh97Z_IZreP8NI8CPl8AFL5og6NDxl8x9mwOItvxoFjohQ_Qybv_pZ8M8vEOrLKyCEhLcYAG6jJPKievVhFoAP_Tuyusv6h_hT0POg5eC-psEhUjO1w_-AsvGuQscnRxvBK2wx93FKi0w" }
    }
    render = () => (
        <ResponsiveDrawer title = 'Dashboard'>
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 30 dias </h2>
                    <GoogleDataChart views={views} config={last30days} />
                    <h2> Tráfego por plataforma nos últimos 30 dias</h2>
                    <GoogleDataChart views={views} config={trafficByPlatformLast30Days} />
                    <h2> Pageviews E-democracia </h2>
                    <GoogleDataChart views={views} config={last7days} />
                    <h2> Tráfego por plataforma nos últimos 7 dias</h2>
                    <GoogleDataChart views={views} config={trafficByPlatformLast7Days} />
                    <h2> Tráfego por plataforma nos últimos anos</h2>
                    <GoogleDataChart views={views} config={trafficByPlatformOverYears} />
                </GoogleProvider>
            </center>
        </ResponsiveDrawer>
    )
}