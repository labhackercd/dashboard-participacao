import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';
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

const lastYears = {
    query: {
        'start-date': '2016-01-01',
        'end-date': 'yesterday',
        'metrics': 'ga:pageviews,ga:sessions',
        'dimensions': 'ga:year',
    },
    chart: {
        'type': 'LINE',
        'options': {
            'title': 'E-democracia - últimos anos'
        }
    }
}

const trafficByPlatformOverYears = {
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
        this.state = {
            token: "ya29.c.Ko4Bwwe3B9xDW2o7QAMnJF4bf89GEgGVLDEMG0jgmQoopa0_jgajs9IwAa676TR1S9xgg0DKb6oxjk7yDRqIrPMQHMJ08tPcQZ90kgU34gdW2CG5rGehYaH60LSWBGqlTnBHFcBWKyHcAFrz6gcDICWaOgyydnNSIfmdJ-LG89Okpq0oBmmKshu7xMb0roMDyw",
            startDate: '2019-01-01',
            endDate: '2020-01-01',
            trafficData: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.setTrafficByPlatformRangeDate = this.setTrafficByPlatformRangeDate.bind(this);
    }

    setTrafficByPlatformRangeDate() {
        var trafficByPlatform = {
            query: {
                'start-date': this.state.startDate,
                'end-date': this.state.endDate,
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
        }
        this.setState({ trafficData: trafficByPlatform });
    }

    handleSubmit(event) {
        this.setTrafficByPlatformRangeDate(event.target.startDate, event.target.endDate)
        event.preventDefault();
    }

    handleStartDateChange(event) {
        this.setState({ startDate: event.toISOString().split('T')[0] })
    }

    handleEndDateChange(event) {
        this.setState({ endDate: event.toISOString().split('T')[0] })
    }

    render = () => (
        <ResponsiveDrawer title='Google Analytics'>
            <center>
                <GoogleProvider accessToken={this.state.token}>
                    <GoogleDataChart views={views} config={last30days} />
                    <GoogleDataChart views={views} config={trafficByPlatformLast30Days} />
                    <GoogleDataChart views={views} config={last7days} />
                    <GoogleDataChart views={views} config={trafficByPlatformLast7Days} />
                    <GoogleDataChart views={views} config={lastYears} />
                    <GoogleDataChart views={views} config={trafficByPlatformOverYears} />
                    <form onSubmit={this.handleSubmit}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                id="start-date"
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
                    <GoogleDataChart views={views} config={this.state.trafficData} />
                </GoogleProvider>



            </center>
        </ResponsiveDrawer>
    )
}