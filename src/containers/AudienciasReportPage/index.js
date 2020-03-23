import React, { Component } from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AudienciasRoomsTableReport from '../../components/AudienciasRoomsTableReportContainer'
import AudienciasUserTableReport from '../../components/AudienciasUsersTableReportContainer'
import AudienciasMadeChart from '../../components/AudienciasMadeCharts'
import AudienciasGenderChart from '../../components/AudienciasGenderChart'
import AudienciasUserChart from '../../components/AudienciasUsersChart'
import Paper  from '@material-ui/core/Paper';

import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: "theme.palette.common.white",
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    overflow: 'auto',
  },

});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AudienciasReportPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: ""
    };
  }


  componentDidMount() {
    this._isMounted = true;
    /*
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {
          this.setState({isLoadingPage:false});
      });
    }
    */
    this.setState({ isLoadingPage: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {

    return (
      <div>
        <ResponsiveDrawer title='Audiências Interativas'>

        <Box mb={5}>
          <Alert severity="info">Este é um texto de alerta para avisar sobre os dados!</Alert>
        </Box>
        <Box>


        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box width="100%" height="100%">
              <AudienciasUserChart></AudienciasUserChart>
            </Box>

          </Grid>
          <Grid item xs={6}>
              <Box>
                <AudienciasGenderChart></AudienciasGenderChart>
              </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <AudienciasMadeChart></AudienciasMadeChart>
            </Box>
          </Grid>
        </Grid>


        <br></br>
        <Divider></Divider>
        <br></br>

          <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Relatório Audiências - Salas</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <AudienciasRoomsTableReport></AudienciasRoomsTableReport>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <br></br>


            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography >Relatório Audiências - Usuários</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>

                <AudienciasUserTableReport></AudienciasUserTableReport>
              </ExpansionPanelDetails>
            </ExpansionPanel>
        </Box>

        </ResponsiveDrawer>
      </div>
    );
  }

}


export default withStyles(useStyles)(AudienciasReportPage);