import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';

import { TablePagination } from '@material-ui/core';
import {PAUTA_PROPOSAL_API_URL} from '../../config_constants'
import { Page1 } from './mock_data';

class PautaProposalTableReport extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'id', title: 'id',  align: 'center'},
    { field: 'number', title: 'Número' },
    { field: 'proposal_type.initials', title: 'Tipo de proposta' },
    { field: 'resource_uri', title: 'URL do recurso'},
    { field: 'title', title: 'Titulo' },
    { field: 'year', title: 'Ano'}]
    
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      currentPage: 1,
      setPage: 0,
      rowsPerPage: 20,
      rows: [],
      totalRows:0
    };
    this.loadDataInTable = this.loadDataInTable.bind(this);
  }
  
  loadDataInTable(callback){
    this.setState({rows: Page1.objects, totalRows: Page1.total_count });
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

    if(loading){
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    }else{
      return (
          <MaterialTable
            columns={this.columns}
            data={this.state.rows}
            options={{
              pageSize:5,
              pageSizeOptions:[15, 30, 45, 60, 75, 90],
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
            title="Usuários"
          />
      )
    }

  }
}

export default (PautaProposalTableReport);