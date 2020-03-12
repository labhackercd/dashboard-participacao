import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Colors} from './components/constant/index'
import './App.css';
import Statitics from './containers/StatisticsOne'
import InitialDashboard from './containers/InitialDashboard'

const theme = createMuiTheme({
  palette: {
    primary: {
        main: Colors.mainColor
      }
    }
  },
)

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
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
