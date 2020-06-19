import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import {PAUTA_PAGED_DOCUMENT_API_URL} from "../../../config_constants";

class PautaProposalTableReport extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'id', title: 'id',  align: 'center'},
    { field: 'number', title: 'Número' },
    { field: 'proposal_type.initials', title: 'Tipo de proposta' },
    { field: 'url', title: 'Link para a proposta'},
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
      totalRows:0,
      data: {}
    };
    this.loadDataInTable = this.loadDataInTable.bind(this);
  }
  
  loadDataInTable(callback){
    this.setState({rows: this.state.data.objects, totalRows: this.state.data.total_count });
    callback();
  }
  
  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    fetch(PAUTA_PAGED_DOCUMENT_API_URL)
    .then(response => response.json())
    .then(data => this.setState({ data: data}))
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
              filtering: true,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              exportFileName: "pauta_proposal_table",
              pageSize:15,
              pageSizeOptions:[15, 30, 45, 60, 75, 90],
              emptyRowsWhenPaging:false,
              removable:true,
              search:true
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
            title="Propostas"
          />
      )
    }

  }
}

export default (PautaProposalTableReport);