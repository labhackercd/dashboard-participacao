import React, { Component } from 'react';
import ResponsiveDrawer from '../MenuDrawer';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
// import AudienciasMadeChart from '../../components/AudienciasMadeCharts'
// import AudienciasGenderChart from '../../components/AudienciasGenderChart'
import PautaUsersChart from '../../components/PautaUsersChart'
import PautaGenderChart from '../../components/PautaGenderChart'
import PautaVoteParticipationChart from '../../components/PautaVoteParticipationChart'
// import AudienciasComissionChart from '../../components/AudienciasComissionChart'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        <ResponsiveDrawer title='Pauta Participativa'>
        <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box width="100%" height="100%">
              <Paper style={{padding: "1rem"}}>
              <center><h1 style={{margin: "1rem 0 1rem 0"}}> Pauta Participativa </h1></center>
              <p style={{lineHeight: 2, fontSize: 23, textAlign: "justify", margin: "0 1.5rem 0 1.5rem"}}>
               A Pauta Participativa é uma forma de 
              você ajudar a Câmara a definir a 
              prioridade de votações dos projetos. 
              Ao final do período de consulta 
              (duas semanas), a comissão votará 
              os projetos de cada tema que tenham 
              obtido o maior saldo positivo de votos, 
              ou seja, votos favoráveis menos votos 
              contrários.</p>
              <br />
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box width="100%" height="100%">
              <PautaVoteParticipationChart></PautaVoteParticipationChart>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box width="100%" height="100%">
              <PautaUsersChart></PautaUsersChart>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box width="100%" height="100%">
              <PautaGenderChart></PautaGenderChart>
            </Box>
          </Grid>
        </Grid>

        </Box>

        </ResponsiveDrawer>
      </div>
    );
  }

}


export default withStyles(useStyles)(AudienciasReportPage);