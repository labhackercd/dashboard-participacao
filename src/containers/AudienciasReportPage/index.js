import React, {Component} from 'react';
import ResponsiveDrawer from '../MenuDrawer';

import {
  withStyles
} from '@material-ui/core/styles';

import {Redirect} from 'react-router-dom';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Divider } from '@material-ui/core';


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
          <br></br>
          <Divider></Divider>
          <br></br>
          <StatiticsTableTest></StatiticsTableTest>
        </ResponsiveDrawer>
      </div> 
    );
  }

}


class StatiticsTable extends Component {
  _isTableMounted=false;
  columns = [
    { field: 'title_reunion', title: 'Título da Reunião',  align: 'center'},
    { field: 'date', title: 'Data' },
    { field: 'questions_count', title: 'Perguntas' },
    { field: 'answered_questions_count', title: 'Perguntas Respondidas'},
    { field: 'messages_count', title: 'Mensagens' },
    { field: 'votes_count', title: 'Votos' },
    { field: 'participants_count', title: 'Participantes'}

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
    //https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true
    //const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/admin/statitics")
    const url = new URL("https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true")

    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ rows: responseJson.results });
      console.log(responseJson.results)
      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  

    callback();
  }

  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }
  }

  render(){
    //console.log(this.columns)

    if(this.isLoadingTable){
      return <CircularProgress></CircularProgress>
    }else{
      return (
        <MaterialTable
          title="Salas"
          columns={this.columns}
          data={this.state.rows}
          options={{
            filtering: true,
            sorting: true,
            exportButton: true,
            exportAllData: true,
            exportFileName: "salas_audiencias_interativas",
            pageSize:5,
            pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
            emptyRowsWhenPaging:false
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum resultado encontrado'
            },
            toolbar: {
              searchTooltip: 'Pesquisar',
              searchPlaceholder: 'Pesquisar'
            },
            pagination: {
              labelRowsSelect: 'Linhas',
              labelDisplayedRows: ' {from}-{to} de {count}',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página Anterior',
              nextTooltip: 'Próxima página',
              lastTooltip: 'Última página'
            }
          }}
        />
      );
    }
  }

}

class StatiticsTableTest extends Component {
  _isTableMounted=false;
  columns = [
    { field: 'title_reunion', title: 'Título da Reunião',  align: 'center'},
    { field: 'date', title: 'Data' },
    { field: 'questions_count', title: 'Perguntas' },
    { field: 'answered_questions_count', title: 'Perguntas Respondidas'},
    { field: 'messages_count', title: 'Mensagens' },
    { field: 'votes_count', title: 'Votos' },
    { field: 'participants_count', title: 'Participantes'}

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
    //https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true
    //const url = new URL(window.location.protocol + '//' + window.location.hostname + ":3000/api/v1/admin/statitics")
    const url = new URL("https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true")

    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ rows: responseJson.results });
      console.log(responseJson.results)
      callback();

    })
    .catch((error) => {
      console.error(error);
    });
  

    callback();
  }

  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }
  }
  
  render(){
    return (
      <MaterialTable
            columns={this.columns}
            data={this.state.rows}
            options={{
              filtering: true,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              exportFileName: "salas_audiencias_interativas",
              pageSize:5,
              pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
              emptyRowsWhenPaging:false,
              removable:true
            }}
            title="Salas - Visão Detalhada"
            detailPanel={rowData => {
              return (
                <div>
                  <p>{rowData.reunion_object}</p>
                  <br></br>
                  <p>{rowData.legislative_body}</p>
                </div>
              )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
          />
    );
  }
}

export default withStyles(useStyles)(AudienciasReportPage);