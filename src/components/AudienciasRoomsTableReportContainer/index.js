import React, {Component} from 'react';
import MaterialTable from "material-table";


class AudienciasRoomsTableReport extends Component {
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
  export default (AudienciasRoomsTableReport);


/*
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
*/