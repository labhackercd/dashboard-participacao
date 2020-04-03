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
              <center><h1>Dados da participação pública da Câmara dos Deputados</h1>
              <img src="/img/initial_dashboard.svg" height="500" width="500" />
              <h2 style={{lineHeight: '1.5', padding: '1rem', textAlign: 'justify'}}><center> Bem vindo a plataforma de participação pública da Câmara dos Deputados! </center></h2>
              <p style={{fontSize: '1.2rem', lineHeight: '2.5', padding: '0 5rem 0 5rem', textAlign: 'justify'}}> Neste portal, nós disponibilizamos os dados em forma gráfica e textual das plataformas de participação da Câmara dos Deputados.
                Como ainda estamos em fase de protótipo, os dados mostrados neste momento <b> não são reais </b> mas representam dados que podem ser obtidos das plataformas numa fase futura da
                plataforma. 
                </p> <p style={{fontSize: '1.2rem', lineHeight: '1.5', padding: '1rem', textAlign: 'justify'}}><center> Agradecemos a sua colaboração!</center></p>
              </center>
            </Box>
          </Paper>
        </ResponsiveDrawer>
      </div> 
    );
  }

}

export default withStyles(useStyles)(InitialDashboard);