import React, { Component } from 'react';
import ResponsiveDrawer from '../MenuDrawer';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import EdemocraciaGenderChart from '../../components/EdemocraciaGenderChart'
import EdemocraciaUsersChart from '../../components/EdemocraciaUsersChart'
import EdemocraciaUsersBrazilMap from '../../components/EdemocraciaUsersBrazilMap'
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

class EDemocraciaPage extends Component {
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
        <ResponsiveDrawer title='e-Democracia'>

        <Box mb={5}>
          <Alert severity="info">Este é um texto de alerta para avisar sobre os dados!</Alert>
        </Box>
        <Box>


        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box width="100%" height="100%">
              <EdemocraciaUsersChart></EdemocraciaUsersChart>
            </Box>

          </Grid>
          <Grid item xs={12} md={6}>
              <Box>
                <EdemocraciaGenderChart></EdemocraciaGenderChart>
              </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" height="100%" alignContent="center">
                <EdemocraciaUsersBrazilMap></EdemocraciaUsersBrazilMap>
            </Box>
          </Grid>
        </Grid>


        </Box>

        </ResponsiveDrawer>
      </div>
    );
  }

}


export default withStyles(useStyles)(EDemocraciaPage);