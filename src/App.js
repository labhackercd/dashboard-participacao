import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Colors } from "./components/constant/index";
import "./App.css";

import InitialDashboard from "./containers/InitialDashboard";

import AudienciasAnalyticsPage from "./containers/AudienciasAnalyticsPage";
import AudienciasReportPage from "./containers/AudienciasReportPage";
import AudienciasChartsPage from "./containers/AudienciasChartsPage";

import EDemocraciaReportPage from "./containers/EDemocraciaReportPage";
import EDemocraciaChartsPage from "./containers/EDemocraciaChartsPage";
import EdemocraciaAnalyticsPage from "./containers/EdemocraciaAnalyticsPage";

import WikilegisReportPage from "./containers/WikilegisReportPage";
import WikilegisAnalyticsPage from "./containers/WikilegisAnalyticsPage";
import WikilegisChartsPage from "./containers/WikilegisChartsPage";
import { ptBR } from "@material-ui/core/locale";
import EnquetesChartsPage from "./containers/EnquetesChartsPage";
import EnquetesReportsPage from "./containers/EnquetesReportsPage";

import PautaChartsPage from "./containers/PautaChartsPage";
import PautaReportPage from "./containers/PautaReportPage";
import PautaAnalyticsPage from "./containers/PautaAnalyticsPage";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: Colors.mainColor
      }
    }
  },
  ptBR
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <InitialDashboard></InitialDashboard>
          </Route>
          <Route exact path="/enquetes-graficos">
            <EnquetesChartsPage theme={theme}></EnquetesChartsPage>
          </Route>
          <Route exact path="/enquetes-relatorios">
            <EnquetesReportsPage theme={theme}></EnquetesReportsPage>
          </Route>

          <Route exact path="/audiencias-relatorios">
            <AudienciasReportPage theme={theme}></AudienciasReportPage>
          </Route>
          <Route exact path="/audiencias-analytics">
            <AudienciasAnalyticsPage theme={theme}></AudienciasAnalyticsPage>
          </Route>
          <Route exact path="/audiencias-graficos">
            <AudienciasChartsPage theme={theme}></AudienciasChartsPage>
          </Route>

          <Route exact path="/pauta-relatorios">
            <PautaReportPage theme={theme}></PautaReportPage>
          </Route>
          <Route exact path="/pauta-graficos">
            <PautaChartsPage theme={theme}></PautaChartsPage>
          </Route>
          <Route exact path="/pauta-analytics">
            <PautaAnalyticsPage theme={theme}></PautaAnalyticsPage>
          </Route>

          <Route exact path="/edemocracia-graficos">
            <EDemocraciaChartsPage theme={theme}></EDemocraciaChartsPage>
          </Route>
          <Route exact path="/edemocracia-analytics">
            <EdemocraciaAnalyticsPage theme={theme}></EdemocraciaAnalyticsPage>
          </Route>
          <Route exact path="/edemocracia-relatorios">
            <EDemocraciaReportPage theme={theme}></EDemocraciaReportPage>
          </Route>

          <Route exact path="/wikilegis-relatorios">
            <WikilegisReportPage theme={theme}></WikilegisReportPage>
          </Route>
          <Route exact path="/wikilegis-analytics">
            <WikilegisAnalyticsPage theme={theme}></WikilegisAnalyticsPage>
          </Route>
          <Route exact path="/wikilegis-graficos">
            <WikilegisChartsPage theme={theme}></WikilegisChartsPage>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
