import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import axios from 'axios'

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
                tableRef={tableRef}
                //data={this.state.rows}
                data={query =>
                  new Promise((resolve, reject) => {
                    let url = AUDIENCIAS_PAGED_USER_API_URL
                    url += (query.page + 1)
                    fetch(url)
                      .then(response => response.json())
                      .then(result => {
                        resolve({
                          data: result.results,
                          page: parseInt((result.next).match(/(\d+)/)),
                          totalCount: result.count,
                        })
                      })
                  })
                }
                actions={[
                  {
                    icon: 'refresh',
                    tooltip: 'Refresh Data',
                    isFreeAction: true,
                    onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                  }
                ]}
                options={{
                  sorting: true,
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: "usuarios_audiencias_interativas",
                  pageSize:10,
                  pageSizeOptions:[5, 10, 20, 30, 40, 50, 100,1300],
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
                title="Usuários Audiências Interativas"

              />
          </Box>
      )
    }
   

  }
}

export default (AudienciasUserTableReport);