import React, { Component } from "react";
import { GoogleProvider } from "react-analytics-widget";
import ResponsiveDrawer from "../MenuDrawer";
import GoogleAnalyticsCharts from "../../components/GoogleAnalytics/GoogleAnalyticsCharts";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { EDEMOCRACIA_GOOGLE_ANALYTICS } from "../../config_constants";

const last7days = {
  reportType: "ga",
  query: {
    dimensions: "ga:pagePathLevel2",
    metrics: "ga:pageviews,ga:sessions",
    "start-date": "7daysAgo",
    "end-date": "yesterday",
    filters: "ga:pagePath=@/pautaparticipativa/",
  },
  chart: {
    type: "LINE",
    options: {
      title: "Acessos nos últimos 7 dias",
    },
  },
};

const trafficByPlatformLast7Days = {
  query: {
    "start-date": "7daysAgo",
    "end-date": "yesterday",
    metrics: "ga:pageviews",
    dimensions: "ga:pagePathLevel2",
    sort: "-ga:pageviews",
    filters: "ga:pagePath=@/pautaparticipativa/",
    "max-results": 10, //number of platforms
  },
  chart: {
    type: "PIE",
    options: {
      width: "100%",
      pieHole: 4 / 9,
      title: "Acessos por ponto de entrada",
    },
  },
};

const last30days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews,ga:sessions",
    "start-date": "30daysAgo",
    "end-date": "yesterday",
    filters: "ga:pagePath=@/pautaparticipativa/",
  },
  chart: {
    type: "LINE",
    options: {
      title: "Acessos nos últimos 30 dias",
    },
  },
};

const trafficByPlatformLast30Days = {
  query: {
    "start-date": "30daysAgo",
    "end-date": "yesterday",
    metrics: "ga:pageviews",
    dimensions: "ga:pagePathLevel2",
    sort: "-ga:pageviews",
    filters: "ga:pagePath=@/pautaparticipativa/",
    "max-results": 10, //number of platforms
  },
  chart: {
    type: "PIE",
    options: {
      width: "100%",
      pieHole: 4 / 9,
      title: "Acessos por ponto de entrada",
    },
  },
};

// analytics views ID
const views = {
  query: {
    ids: "ga:125230257",
  },
};

export default class PautaParticipativaAnalyticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoading: true,
      gaMetricsSwitch: "month",
    };
    this.handleMetricsSwitchChange = this.handleMetricsSwitchChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(EDEMOCRACIA_GOOGLE_ANALYTICS); // Alterar pela URL válida
      const json = await response.json();
      this.setState({ token: json.token, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleMetricsSwitchChange(event) {
    this.setState({ gaMetricsSwitch: event.target.value });
  }

  renderGoogleAnalyticsSwitch() {
    switch (this.state.gaMetricsSwitch) {
      case "month":
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={"Pauta Participativa - últimos 30 dias"}
            lineChartConfig={last30days}
            pieChartConfig={trafficByPlatformLast30Days}
          />
        );
      case "week":
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={"Pauta Participativa - últimos 7 dias"}
            lineChartConfig={last7days}
            pieChartConfig={trafficByPlatformLast7Days}
          />
        );
      default:
        return (
          <GoogleAnalyticsCharts
            views={views}
            title={"Pauta Participativa - últimos 30 dias"}
            lineChartConfig={last30days}
            pieChartConfig={trafficByPlatformLast30Days}
          />
        );
    }
  }

  render() {
    const loading = this.state.isLoading;

    if (loading) {
      return (
        <div align="center">
          {" "}
          <CircularProgress></CircularProgress>{" "}
        </div>
      );
    } else {
      return (
        <ResponsiveDrawer title="Analytics Pauta Participativa">
          <GoogleProvider accessToken={this.state.token}>
            <Paper>
              <Box paddingY={3} paddingX={2} spacing={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InputLabel id="select-label">Visualizar por</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={this.state.gaMetricsSwitch}
                      onChange={this.handleMetricsSwitchChange}
                    >
                      <MenuItem value={"month"}>Últimos 30 dias</MenuItem>
                      <MenuItem value={"week"}>Últimos 7 dias</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Box>

              <Divider variant="middle"></Divider>

              <Box spacing={2} paddingTop={2}>
                {this.renderGoogleAnalyticsSwitch()}
              </Box>

              <Box
                style={{
                  padding: "2rem",
                  fontSize: "1rem",
                  lineHeight: "2",
                  textAlign: "justify",
                }}
              >
                <p>
                  {" "}
                  No gráfico da esquerda, mostramos os acessos por cada modo com
                  o qual um usuário pode interagir com o Pauta Participativa. A
                  seção em azul, cuja legenda é "/", se refere a página inicial
                  do{" "}
                  <a href="https://edemocracia.camara.leg.br/pautaparticipativa/">
                    Pauta Participativa
                  </a>
                  . Do mesmo modo, "/pauta" significa todos os acessos dos
                  usuários que passaram da página inicial da plataforma, e
                  acessaram pelo menos um dos projetos - o que não quer dizer
                  que eles participaram necessariamente. A legenda "/method" se
                  refere a todos que acessaram a explicação de como o Pauta
                  funciona disponível no site, e "/api" reflete os acessos
                  daqueles que interagiram com a nossa interface de programação.{" "}
                </p>
              </Box>
            </Paper>
          </GoogleProvider>
        </ResponsiveDrawer>
      );
    }
  }
}
