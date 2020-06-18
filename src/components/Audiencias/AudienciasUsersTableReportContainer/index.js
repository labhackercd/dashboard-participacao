import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import { TablePagination } from '@material-ui/core';

import {AUDIENCIAS_PAGED_USER_API_URL} from '../../../config_constants'


class AudienciasUserTableReport extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'id', title: 'ID',  align: 'center'},
    { field: 'questions_count', title: 'Perguntas Feitas' },
    { field: 'messages_count', title: 'Mensagens Enviadas' },
    { field: 'votes_count', title: 'Votos' },
    { field: 'participations_count', title: 'Número de Participações'},
    { field: 'questions_votes_count', title: 'Votos em questões'},
    { field: 'date_joined', title: 'Data do Cadastro'}
  ]
    
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      currentPage: 1,
      setPage: 0,
      rowsPerPage: 20,
      rows: [ ],
      totalRows:0
    };
  }
  
  loadDataInTable(callback){
    //https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true

    const url = new URL(AUDIENCIAS_PAGED_USER_API_URL + this.state.currentPage)

    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ rows: responseJson.results, totalRows: responseJson.count });
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
    
    //callback();
  }

    handleNextPageChange(page){
      
      this.setState({isLoadingTable:true, currentPage:page})
      
      const url = new URL(AUDIENCIAS_PAGED_USER_API_URL + this.state.currentPage)

      fetch(url, {
        method: 'GET',
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rows: responseJson.results});
        this.setState({isLoadingTable:false})
      })
      .catch((error) => {
        console.error(error);
      });
      
    }
  
  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }
  }
    
  handleNextPageChangeTeste(e,p){
    this.handleNextPageChange(p)
    
  }


  render(){
    const loading = this.state.isLoadingTable

    if(loading){
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    }else{
      return (
        <Box width="auto" display="inline">
          <MaterialTable
            columns={this.columns}
            data={this.state.rows}
            options={{
              pageSize:100,
              pageSizeOptions:[20, 40, 60, 80, 100,80000],
              emptyRowsWhenPaging:false,
              removable:true,
              search:false
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
            components={{
              Pagination: props => <TablePagination {...props} count={this.state.totalRows} page={this.state.currentPage} onChangePage={(event,page) => {this.handleNextPageChangeTeste(event,page) /* handle page size change : event.target.value */}}/>
            }}
            title="Usuários"
          />
        </Box>
      )
    }

  }
}

export default (AudienciasUserTableReport);