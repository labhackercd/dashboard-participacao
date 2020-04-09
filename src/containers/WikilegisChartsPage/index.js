import React,  { Component } from 'react';
import ResponsiveDrawer from "../MenuDrawer";
import { Title, BarSeries, Chart, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { makeStyles } from '@material-ui/core/styles';
import WikilegisGenderChart from '../../components/Wikilegis/WikilegisGenderChart';
import WikilegisProjectsPerYear from '../../components/Wikilegis/WikilegisProjectsPerYear';
import WikilegisProjectsPerTheme from '../../components/Wikilegis/WikilegisProjectsPerTheme';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

function WikilegisChartsPage() {
  const classes = useStyles();
  return (
      <div>
        <ResponsiveDrawer title="Wikilegis - Gráficos">
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Paper>
                  <WikilegisProjectsPerTheme></WikilegisProjectsPerTheme>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper>
                  <WikilegisGenderChart></WikilegisGenderChart>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper>
                  <WikilegisProjectsPerYear></WikilegisProjectsPerYear>
                  </Paper>
                </Grid>
              </Grid>
            </div>
        </ResponsiveDrawer>
      </div>   
  );  
}

export default WikilegisChartsPage;
