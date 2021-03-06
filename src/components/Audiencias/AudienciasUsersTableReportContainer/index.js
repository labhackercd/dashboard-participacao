import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import axios from 'axios'
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
      totalRows:0,
      totalCount:0,
      currentPageCount:1
    };
  }
  
  getUsers = (url, planets, resolve, reject) => {
  
    axios.get(url)
    .then(response => {
      const retrivedPlanets = planets.concat(response.data.results)
      if (response.data.next !== null) {
        this.setState({currentPageCount: ((response.data.next).match(/(\d+)/))})
        this.getUsers(response.data.next, retrivedPlanets, resolve, reject)
      } else {
        resolve(retrivedPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
  }


  loadDataInTable(callback){
    //const url = new URL(AUDIENCIAS_PAGED_USER_API_URL)
    /*
    new Promise((resolve, reject) => {
      this.getUsers((url+"1"), [], resolve, reject)
    })
    .then(response => {
      this.setState({rows: response})
      callback()
    })*/
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
    
  handleNextPageChangeTeste(e,p){
    this.handleNextPageChange(p)
    
  }


  render(){
    const loading = this.state.isLoadingTable
    const tableRef = React.createRef();

    if(loading){
      return (<div align="center"> 
                <Box width="auto" display="inline">
                  <CircularProgress></CircularProgress> 
                </Box>
                <Box>
                  Buscando dados da página {this.state.currentPageCount[0]}
                </Box>
              </div>
             )
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
              search:true, 
              exportButton: true,
              exportAllData: true,
              exportFileName: "audiencias_users_table_report",
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