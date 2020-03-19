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
        this.state = { token: "ya29.c.Ko4BwwdnkssUwZBOiKoJGADOqIpiT9J8bZTc4MpWj3AAI0B8EQsRHMEJ-nvzQ3oaLmpetRIleUbMuoQs48omw0Xai3VP--TANYApyryvqcNjrT-Ock1IZCGS8xOhlBHJMXeKuAI2oNBTt51_5BTj17oI0yrBoR4vAlNn-_plGAwEABjkDS9x6z25mvGY8I21Sw" }
        // this.chartIDs = ['edemocracia-30days', 'edemocracia-7days', 'trafficByPlatformLast7Days']
        // this.promises = []
        this.images = []
        this.getOneImage = this.getOneImage.bind(this)
        this.testGetOneImage = this.testGetOneImage.bind(this)

    }

    getOneImage(id) {
      const input = document.getElementById(id)
      return html2canvas(input).then((canvas) => canvas.toDataURL('image.png')).catch((err) => console.log(err))
    } 

    testGetOneImage() {
      var p = this.getOneImage('edemocracia-7days')
      p.then((image) => {
        this.images.push(image)
        console.log(this.images)
        return this.images
      }).then((images) => this.getOneImage('edemocracia-30days'))
      .then((image) => {
        this.images.push(image)
        console.log(this.images)
        return this.images
        }
      ).then((images) => {
        const pdf = new jsPDF('p','px', 'a4')
        var width = pdf.internal.pageSize.getWidth()
        this.images.forEach((image) => {
          var imgProps = pdf.getImageProperties(image)
          var height = (imgProps.height * width) / imgProps.width
          pdf.addImage(image, 'JPEG', 0, 0, width, height)
          pdf.addPage()
        })
        return pdf
      }).then((pdf) => {
        pdf.save('ufa.pdf')
      })
    }

    printGraphic(id) {
      const input = document.getElementById(id)
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
              <button onClick={() => this.printGraphic('edemocracia-30days')}> Download </button>
            </center>
            <br />
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 7 dias </h2>
                    <div className="chart" id='edemocracia-7days'>
                      <GoogleDataChart views={views} config={last7days} />
                    </div>
                </GoogleProvider>
              <button onClick={() => this.printGraphic('edemocracia-7days')}> Download </button>
            </center>
            <br />
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <h2> Pageviews E-democracia - últimos 30 dias </h2>
                    <div className="chart" id='trafficByPlatformLast7Days'>
                      <GoogleDataChart views={views} config={trafficByPlatformLast30Days} />
                    </div>
                </GoogleProvider>
              <button onClick={() => this.printGraphic('trafficByPlatformLast7Days')}> Download </button>
            </center>
            <br />
            <button onClick={this.testGetOneImage}> Download All </button>
        </ResponsiveDrawer>
    )
}
        // this.loadAllImages = this.loadAllImages.bind(this)
        // this.getImageFromElement = this.getImageFromElement.bind(this)
        // this.generatePDFAllCharts = this.generatePDFAllCharts.bind(this)

      // //create first page 
      // html2canvas(this.graphs[0], {
      //   onrendered: function(canvas) {
      //     var imgData = canvas.toDataURL('image/png');
      //     doc.addImage(imgData, 'PNG', 0, 0);
      //   }
      // });
      // // create other pages
      // this.graphs.slice(1).map((item) => {
      //   html2canvas(item, {
      //     onrendered: function(canvas,doc) {
      //       var imgData = canvas.toDataURL('image/png');
      //       doc.addPage('l', 'mm', 'a4');
      //       const imgProps = doc.getImageProperties(imgData);
      //       const width = doc.internal.pageSize.getWidth();
      //       var height = (imgProps.height * width) / imgProps.width;
      //       doc.addImage(imgData, 'JPEG', 0, 0, width, height);
      //     }
      //   });
      // });
      // doc.save();


      // var promises = []
      // var pages = []

      // this.graphs.map((input) => {
      //   var element = document.getElementById(input)
      //   var p = html2canvas(element)
      //               .then((canvas) => {
      //                 pages.push(canvas.toDataURL('image/png'))
      //               })
      //   promises.push(p)
      // })
      // var pdf = new jsPDF('p', 'px', 'a4');
      // promises.forEach(promise => {
      //   var p = Promise.resolve();
      //   p.then((img) => {
      //     pdf.addImage(img, 'JPEG', 0, 0);
      //   });
      // });
      // pdf.save()
      
      // Promise.all(promises)
      //   .then(function () {
      //     var pdf = new jsPDF('p', 'px', 'a4');
      //     pages.map((page) => {
      //       var width = pdf.internal.pageSize.getWidth();
      //       const imgProps = pdf.getImageProperties(page);
      //       var height = (imgProps.height * width) / imgProps.width;
      //       pdf.addImage(page, 'JPEG', 0, 0, width, height)
      //       // result.addPage(page, 'JPEG', 0, 0)
      //     })
      //     pdf.save("result.pdf")
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

         // async getImageFromElement(id) {
   //    const input = document.getElementById(id)
   //    html2canvas(input)
   //      .then((canvas) => {
   //        const img = canvas.toDataURL('image/png')
   //        return img
   //      })
   //  }

       // generateImagePromises() {
    //   this.chartIDs.map((id) => {
    //     const input = document.getElementById(id)
    //     var p = html2canvas(input).then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png')
    //       this.promises.push(imgData)
    //     })
    //   })
    // }

    // async seePromises() {
    //   var inputs = [document.getElementById('edemocracia-7days'), document.getElementById('edemocracia-30days')]
    //   const pdf = new jsPDF('p', 'px', 'a4')
    //   inputs.map((input) => {
    //     html2canvas(input).then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png')
    //       var width = pdf.internal.pageSize.getWidth();
    //       const imgProps= pdf.getImageProperties(imgData);
    //       var height = (imgProps.height * width) / imgProps.width;
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //     })
    //   })
    // }

   // async loadAllImages() {
   //    for (var i=0; i < this.chartIDs.length; i++) {
   //      var img = await this.getImageFromElement(this.chartIDs[i])
   //      this.images.push(img)
   //    }
   //    return this.images
   //  }

   // async generatePDFAllCharts() {
   //    var pdf = new jsPDF('p', 'px', 'a4')
   //    var width = pdf.internal.pageSize.getWidth()
   //    var images = await this.loadAllImages()
   //    for (var i=0; i < this.images.length ;i++) {
   //      console.log(this.images[i])
   //    }
   // }