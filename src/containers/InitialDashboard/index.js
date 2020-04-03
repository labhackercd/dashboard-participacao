import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  withStyles
} from '@material-ui/core/styles';


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: "theme.palette.common.white",
      fontFamily: "Lato, sans-serif",
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
    padding: 0,
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },

});

class InitialDashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar:false,
      snackBarMessageError:""
    };
  }


  componentDidMount() {
    this._isMounted = true;
    /*
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {

        this.checkIfUserIsAdmin( () => {

          this.setState({isLoadingPage:false});

        });

      });
    }
    */
    this.setState({isLoadingPage:false});

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {
    
    
    return  (
      <div>
        <ResponsiveDrawer title = 'Dashboard'>
          <Paper>
            <Box style={{padding: '1rem'}}>
              <center><h1>Dados da participação pública da Câmara dos Deputados</h1></center>
              <center><img src="/img/initial_dashboard.svg" height="600" width="600" /></center>
              <p style={{fontSize: '1.2rem', lineHeight: '1.5', padding: '1rem', textAlign: 'justify'}}> Bem vindo a plataforma de participação pública da Câmara dos Deputados. </p>
            </Box>
          </Paper>
        </ResponsiveDrawer>
      </div> 
    );
  }

}

export default withStyles(useStyles)(InitialDashboard);