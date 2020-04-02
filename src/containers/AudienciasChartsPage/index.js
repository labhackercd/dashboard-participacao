import React, { Component } from 'react';
import ResponsiveDrawer from '../MenuDrawer';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import AudienciasMadeChart from '../../components/AudienciasMadeCharts'
import AudienciasGenderChart from '../../components/AudienciasGenderChart'
import AudienciasUserChart from '../../components/AudienciasUsersChart'
import AudienciasAgeUsersChart from '../../components/AudienciasAgeUsersChart'
import AudienciasComissionChart from '../../components/AudienciasComissionChart'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Chat';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


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


        <Grid container spacing={2}>

          <Grid item xs={3}>
              <UsersInfoCard></UsersInfoCard>
          </Grid>
          <Grid item xs={3}>
              {AudiencesInfoCard()}
          </Grid>
          <Grid item xs={3}>
              {MessagesInfoCard()}
          </Grid>
          <Grid item xs={3}>
              {QuestionsInfoCard()}
          </Grid>

          <Grid item xs={12} md={4} zeroMinWidth>
            <Box width="100%" height="100%">
              <AudienciasUserChart></AudienciasUserChart>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} zeroMinWidth>
              <Box>
                <AudienciasGenderChart></AudienciasGenderChart>
              </Box>
          </Grid>
          <Grid item xs={12} md={4} zeroMinWidth>
            <Box>
              <AudienciasComissionChart></AudienciasComissionChart>
            </Box>
          </Grid>
          <Grid item xs={8} zeroMinWidth>
            <Box>
              <AudienciasMadeChart ></AudienciasMadeChart>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <AudienciasAgeUsersChart></AudienciasAgeUsersChart>
            </Box>
          </Grid>
        </Grid>

        </Box>

        </ResponsiveDrawer>
      </div>
    );
  }

}

function UsersInfoCard() {
  
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container >
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <PersonOutlineIcon  style={{ fontSize: 70 }} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="p" variant="h4">
                  72.000
                </Typography>
                <Typography color="textSecondary" >
                  usuários
                </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function AudiencesInfoCard() {
  
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container >
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <ForumIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item>
                <Typography component="p" variant="h4">
                  150
                </Typography>
                <Typography color="textSecondary" >
                  audiências Interativas
                </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function MessagesInfoCard() {
  
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container >
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <ChatIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="p" variant="h4">
                  125.231
                </Typography>
                <Typography color="textSecondary" >
                  mensagens
                </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function QuestionsInfoCard() {
  
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container >
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <HelpOutlineIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item xs={4}>
                <Typography component="p" variant="h4">
                  2100
                </Typography>
                <Typography color="textSecondary" >
                  perguntas
                </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(useStyles)(AudienciasReportPage);