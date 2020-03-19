import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

// graph 1 config q   
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

// graph 1 config
const last30days = {
    reportType: 'ga',
    query: {
        'dimensions': 'ga:date',
        'metrics': 'ga:pageviews,ga:sessions',
        'start-date': '30daysAgo',
        'end-date': 'yesterday'
    },
    chart: {
        type: 'LINE',
        options: {
            'title': 'E-democracia - últimos 30 dias'
        }
    }
}

const trafficByPlatformLast30Days = {
    query: {
        'start-date': '30daysAgo',
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
            'title': 'Tráfego por plataforma nos últimos 30 dias'
        }
    }
}

// graph 2 config
const last7days = {
    reportType: 'ga',
    query: {
        'dimensions': 'ga:date',
        'metrics': 'ga:pageviews,ga:sessions',
        'start-date': '7daysAgo',
        'end-date': 'yesterday'
    },
    chart: {
        type: 'LINE',
        options: {
            'title': 'E-democracia - últimos 7 dias'
        }
    }
}


const trafficByPlatformLast7Days = {
    query: {
        'start-date': '7daysAgo',
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
            'title': 'Tráfego por plataforma nos últimos 7 dias'
        }
    }
}

// analytics views ID
const views = {
    query: {
        ids: "ga:125230257"
    }
}

function getCurrentDate() {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`
}

export default class AnalyticsPage extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            token: "ya29.c.Ko4BwwdTiyaGqpzPa6eM5BYpygrtmSsu9agw1ftpvn-QgzE0DXZBsvHxX47lHXc2PqKVg_rLTqJjgLD58IoIHKQINotlPgMken38DyQLnTy5CUpl3qr8KCSvo8SA-X3lESf5HFKnWZ-FrCR5Llf88SFYx3YIfJPXEQ7OpS0-_c7S0jvml6m_Xy5V40Q5vdghkw",
            startDate: '2016-01-01',
            endDate: getCurrentDate(),
            lineChartData: {
                query: {
                    'start-date': '2016-01-01',
                    'end-date': 'yesterday',
                    'metrics': 'ga:pageviews,ga:sessions',
                    'dimensions': 'ga:yearMonth',
                },
                chart: {
                    'type': 'LINE',
                    'options': {
                        'title': 'E-democracia - últimos anos'
                    }
                }
            },
            pieChartData: {
                query: {
                    'start-date': '2016-01-01',
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
                        'title': 'Tráfego por plataforma  nos últimos anos'
                    }
                }
            },
        };
        this.chartIDs = ['edemocracia-30days', 'edemocracia-7days', 'trafficByPlatformLast7Days']
        this.singleImagePromiseById = this.singleImagePromiseById.bind(this)
        this.mountsAllPromisesFromSingleImages = this.mountsAllPromisesFromSingleImages .bind(this)
        this.appendsImagesToPDFFile = this.appendsImagesToPDFFile.bind(this)
        this.generatesAllChartsPDF = this.generatesAllChartsPDF.bind(this)
        this.exportFinalFile = this.exportFinalFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
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

    handleSubmit(event) {
        this.setState(prevState => ({
            lineChartData: {
                ...prevState.lineChartData,
                query: {
                    ...prevState.query,
                    'start-date': this.state.startDate,
                    'end-date': this.state.endDate,
                    'metrics': 'ga:pageviews,ga:sessions',
                    'dimensions': 'ga:yearMonth',
                }
            },
            pieChartData: {
                ...prevState.pieChartData,
                query: {
                    ...prevState.query,
                    'start-date': this.state.startDate,
                    'end-date': this.state.endDate,
                    'metrics': 'ga:pageviews',
                    'dimensions': 'ga:pagePathLevel1',
                    'sort': '-ga:pageviews',
                    'filters': 'ga:pagePathLevel1!=/',
                    'max-results': 4
                }
            }
        }))
        event.preventDefault();
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date.toISOString().split('T')[0] })
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date.toISOString().split('T')[0] })
    }

    render() {
        return (
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
            <form onSubmit={this.handleSubmit}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    id="start-date"
                                    name="startDate"
                                    label="Start Date"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    id="end-date"
                                    name="endDate"
                                    label="End Date"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <input type="submit" value="Enviar" />
                        </form>
                        <GoogleDataChart views={views} config={this.state.lineChartData} />
                        <GoogleDataChart views={views} config={this.state.pieChartData} />            
            <button onClick={this.generatesAllChartsPDF}> Download All </button>
        </ResponsiveDrawer>
      )
    }
  }