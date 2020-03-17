import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import ResponsiveDrawer from '../MenuDrawer';


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

class DateRangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            startDate: event.target.startDate,
            endDate: event.target.endDate
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Data de início:
                    <input name='startDate' value={this.state.startDate} />
                </label>
                <label>
                    Data de término:
                    <input name='endDate' value={this.state.endDate} />
                </label>
                <input type="submit" value="Enviar" />
            </form>
        );
    }
}
export default class AnalyticsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "token"
        }
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
                </GoogleProvider>
            </center>
        </ResponsiveDrawer>
    )
}