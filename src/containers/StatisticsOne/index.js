import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import {
  withStyles
} from '@material-ui/core/styles';

import {Redirect} from 'react-router-dom';
import MaterialTable from "material-table";


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
    maxHeight: 440,
    overflow: 'auto',
  },

});

class Statitics extends Component {
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
        <ResponsiveDrawer title = 'Estatísticas Partipação Pública'>
          <StatiticsTable> </StatiticsTable>
        </ResponsiveDrawer>
      </div> 
    );
  }

}


class StatiticsTable extends Component {
  _isTableMounted=false;
  columns = [
    { field: 'language', title: 'Language',  align: 'center'},
    { field: 'numberWantToLearn', title: 'Want to learn', align: 'center' },
    { field: 'numberWantToTeach', title: 'Want to teach' },
    {
      field: 'activeMatches',
      title: 'Number of Active Matches'
    }
  ]

  dataTest=  [
    { language: 'English', numberWantToLearn: 100, numberWantToTeach:40, activeMatches: 2 },
    { language: 'Finnish', numberWantToLearn: 20, numberWantToTeach:63, activeMatches: 5 },
    { language: 'Sweden', numberWantToLearn: 5, numberWantToTeach:67, activeMatches: 6 },
    { language: 'Portuguese', numberWantToLearn: 10, numberWantToTeach:54, activeMatches: 9 },
    { language: 'French', numberWantToLearn: 33, numberWantToTeach:34, activeMatches: 3 },
    { language: 'English 2', numberWantToLearn: 100, numberWantToTeach:40, activeMatches: 2 },
    { language: 'Finnish 2', numberWantToLearn: 20, numberWantToTeach:63, activeMatches: 5 },
    { language: 'Sweden 2', numberWantToLearn: 5, numberWantToTeach:67, activeMatches: 6 },
    { language: 'Portuguese 2', numberWantToLearn: 10, numberWantToTeach:54, activeMatches: 9 },
    { language: 'French 2', numberWantToLearn: 33, numberWantToTeach:34, activeMatches: 3 },
  ]

  
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: [ 
        
      ],
     
    };
  }


  loadDataInTable(callback){
    // http://localhost:3000/api/v1/users/adminUsers
    const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/admin/statitics")

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      cors:'no-cors'
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ rows: responseJson.data });
      //console.log(responseJson.data)
      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  

    callback();
  }

  componentDidMount() {
    this._isTableMounted = true;
    /*
    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }*/
    this.setState({isLoadingTable:false});
  }

  render(){
    //console.log(this.columns)

    if(this.isLoadingTable){
      return null;
    }

    return (
      <MaterialTable
        title="Language Data"
        columns={this.columns}
        data={this.state.rows}
        options={{
          sorting: true,
          exportButton: true,
          exportAllData: true,
          exportFileName: "languages",
          pageSize:20,
          pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
          emptyRowsWhenPaging:false
        }}
      />
    );
  }

}

export default withStyles(useStyles)(Statitics);