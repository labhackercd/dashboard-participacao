import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import {withStyles} from '@material-ui/core/styles';

import AudienciasRoomsTableReport from '../../components/AudienciasRoomsTableReportContainer'

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
    padding: 0,
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 500,
    overflow: 'auto',
  },

});

class AudienciasReportPage extends Component {
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
          this.setState({isLoadingPage:false});
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
        <ResponsiveDrawer title = 'Estatísticas Partipação Pública'>
            <AudienciasRoomsTableReport></AudienciasRoomsTableReport>
        </ResponsiveDrawer>
      </div> 
    );
  }

}


export default withStyles(useStyles)(AudienciasReportPage);