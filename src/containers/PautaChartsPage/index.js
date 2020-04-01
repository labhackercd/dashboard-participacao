import React, { Component } from 'react';
import ResponsiveDrawer from '../MenuDrawer';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
// import AudienciasMadeChart from '../../components/AudienciasMadeCharts'
// import AudienciasGenderChart from '../../components/AudienciasGenderChart'
import PautaUsersChart from '../../components/PautaUsersChart'
import PautaGenderChart from '../../components/PautaGenderChart'
// import AudienciasComissionChart from '../../components/AudienciasComissionChart'
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
        <ResponsiveDrawer title='Pauta Participativa'>
        <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} zeroMinWidth>
            <Box width="100%" height="100%">
              <PautaUsersChart></PautaUsersChart>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} zeroMinWidth>
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