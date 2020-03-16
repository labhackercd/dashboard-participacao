import React, { Component } from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'


// graph 1 config
const last30days = {
    reportType: "ga",
    query: {
        dimensions: "ga:date",
        metrics: "ga:pageviews",
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
        metrics: "ga:pageviews",
        "start-date": "7daysAgo",
        "end-date": "yesterday"
    },
    chart: {
        type: "LINE"
    }
}

// analytics views ID
const views = {
    query: {
        ids: "ga:125230257"
    }
}

export default class AnalyticsPage extends Component {
    // componentDidMount = () => {
    //     const request = new Request('https://yourserver.example/auth/ganalytics/getToken', {
    //         method: 'GET'
    //     });
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(({ token }) => {
    //             this.setState({ token }); // TODO: handle errors
    //         });
    // }
    constructor(props) {
        super(props)
        this.state = { token: "token" }
    }
    render = () => (
        <GoogleProvider accessToken={this.state.token}>
            <GoogleDataChart views={views} config={last30days} />
            <GoogleDataChart views={views} config={last7days} />
        </GoogleProvider>
    )
}