import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

// graph 1 config q   
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
        this.state = { token: "ya29.c.Ko4BwgeZabB7px-w9qSkKzJp3ctHE1ckQkNIVzub9raJPM88l4zbqO5tCf71fX3Vg9fqgjSwKaDNxdwfUxqSVpJyLw5yX0K3TE7eQh7GCK5cPokDXDIeYnmSuilSoYs7B0lFlDcNatB9CWnmRXIr3y13aZbhChO23skQo9rpqxoF4gfM8q_6a5Gyyb-CJdelQw" }
        this.printGraphic = this.printGraphic.bind(this)
    }

    printGraphic() {
      const input = document.getElementById('edemocracia-30days')
      const pdf = new jsPDF()
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF('p', 'px', 'a4')
          var width = pdf.internal.pageSize.getWidth();
          const imgProps= pdf.getImageProperties(imgData);
          var height = (imgProps.height * width) / imgProps.width;
          pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
          pdf.save("test.pdf");
        })
    }

    render = () => (
        <ResponsiveDrawer title = 'Dashboard'>
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 30 dias </h2>
                    <div className="chart" id='edemocracia-30days'>
                      <GoogleDataChart views={views} config={last30days} />
                    </div>
                </GoogleProvider>
              <button onClick={this.printGraphic}> Download </button>
            </center>
        </ResponsiveDrawer>
    )
}