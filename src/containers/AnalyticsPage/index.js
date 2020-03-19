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

class allGoogleCharts extends Component {
  constructor(props) {
    super(props)
  }

}

export default class AnalyticsPage extends Component {
  
    constructor(props) {
        super(props)
        this.state = { token: "ya29.c.Ko4BwwcfPMXLUChT91EVC6k_zfyqcS2xG2o9OrRHeMtzjgCZ-VOUvg0EPOQ0fZ-OeiTU2glBXrg7YS2WN1S17v8C2axEYgsqFIUJGhlPSJEq_WDWvicBrC_dN10cPzu-juccMbRDqt-IXz4NcXSs7d5M0NUXI9e4urG0Clq11e9wyQki5NqN522H7JqciRz8yw" }
        this.chartIDs = ['edemocracia-30days', 'edemocracia-7days', 'trafficByPlatformLast7Days']
        this.singleImagePromiseById = this.singleImagePromiseById.bind(this)
        this.mountsAllPromisesFromSingleImages = this.mountsAllPromisesFromSingleImages .bind(this)
        this.appendsImagesToPDFFile = this.appendsImagesToPDFFile.bind(this)
        this.generatesAllChartsPDF = this.generatesAllChartsPDF.bind(this)
        this.exportFinalFile = this.exportFinalFile.bind(this)
    }

    singleImagePromiseById(id) {
      const input = document.getElementById(id)
      return html2canvas(input).then((canvas) => {
        return canvas.toDataURL('image.png')
      })
    } 

    mountsAllPromisesFromSingleImages() {
      var promises = []
      for (var i=0; i < this.chartIDs.length; i++) {
        var p = this.singleImagePromiseById(this.chartIDs[i])
        promises.push(p)
      }
      return promises
    }

    generatesAllChartsPDF() {
      var promises = this.mountsAllPromisesFromSingleImages()
      Promise.all(promises).then((images) => {
        this.appendsImagesToPDFFile(images)
      })
    }

    appendsImagesToPDFFile(images, single_image_id) {
      const pdf = new jsPDF('p', 'px', 'a4')
      var width = pdf.internal.pageSize.getWidth()
      console.log("images length: " + images.length)
      images.forEach((image, index) => {
          var imgProps = pdf.getImageProperties(image)
          var height = (imgProps.height * width) / imgProps.width
          pdf.addImage(image, 'JPEG', 0, 0, width, height)
          if (index < images.length - 1) pdf.addPage()
      })
      single_image_id === null ? this.exportFinalFile({
        'name' : 'all_charts.pdf',
        'pdf': pdf
      }) : this.exportFinalFile({
        'name' : single_image_id,
        'pdf': pdf
      })
    }

    exportFinalFile(obj) {
      obj.pdf.save(obj.name)
    }

    printSingleChart(id) {
      this.singleImagePromiseById(id)
          .then((image) => {
            this.appendsImagesToPDFFile([image], id)
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
              <button onClick={() => this.printSingleChart('edemocracia-30days')}> Download </button>
            </center>
            <br />
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 7 dias </h2>
                    <div className="chart" id='edemocracia-7days'>
                      <GoogleDataChart views={views} config={last7days} />
                    </div>
                </GoogleProvider>
              <button onClick={() => this.printSingleChart('edemocracia-7days')}> Download </button>
            </center>
            <br />
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 30 dias </h2>
                    <div className="chart" id='trafficByPlatformLast7Days'>
                      <GoogleDataChart views={views} config={trafficByPlatformLast30Days} />
                    </div>
                </GoogleProvider>
              <button onClick={() => this.printSingleChart('trafficByPlatformLast7Days')}> Download </button>
            </center>
            <br />
            <button onClick={this.generatesAllChartsPDF}> Download All </button>
        </ResponsiveDrawer>
    )
}