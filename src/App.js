import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Colors } from './components/constant/index'
import './App.css';
import Statitics from './containers/StatisticsOne'
import InitialDashboard from './containers/InitialDashboard'
import AnalyticsPage from './containers/AnalyticsPage'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.mainColor
    }
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <InitialDashboard></InitialDashboard>
          </Route>
          <Route exact path="/estatisticas1">
            <Statitics />
          </Route>
          <Route exact path="/analytics-page">
            <AnalyticsPage theme={theme}></AnalyticsPage>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
