import React, { Component } from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';

import { TablePagination } from '@material-ui/core';



class WikilegisDocumentsTableReport extends Component {

  _isTableMounted = false;
  columns = [
    { field: 'id', title: 'id' },
    { field: 'responsible.name', title: 'Autor', align: 'center' },
    { field: 'theme.name', title: 'Tema' },
    { field: 'document_type.initials', title: 'Tipo projeto' },
    { field: 'number', title: 'Número' },
    { field: 'year', title: 'Ano' },
    { field: 'suggestions_count', title: 'Total de sugestões' },
    { field: 'vote_count', title: 'Total de votos' },
    { field: 'users_count', title: 'Total de participantes' }
  ]

  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable: true,
      currentPage: 1,
      setPage: 0,
      rowsPerPage: 20,
      rows: [],
      totalRows: 0
    };
  }

  loadDataInTable(callback) {
    const url = new URL("http://127.0.0.1:8001/api/v1/documents/?page=" + this.state.currentPage)

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

  handleNextPageChange(page) {

    this.setState({ isLoadingTable: true, currentPage: page })

    const url = new URL("http://127.0.0.1:8001/api/v1/documents/?page=" + this.state.currentPage)

    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rows: responseJson.results });
        this.setState({ isLoadingTable: false })
      })
      .catch((error) => {
        console.error(error);
      });

  }

  componentDidMount() {
    this._isTableMounted = true;

    if (this._isTableMounted) {
      this.loadDataInTable(() => {
        this.setState({ isLoadingTable: false });
      });

    }
  }

  render() {
    const loading = this.state.isLoadingTable

    if (loading) {
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    } else {
      return (
        <MaterialTable
          columns={this.columns}
          data={this.state.rows}
          options={{
            pageSize: 100,
            pageSizeOptions: [20, 40, 60, 80, 100, 80000],
            emptyRowsWhenPaging: false,
            removable: true,
            search: false
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
            Pagination: props => <TablePagination {...props} count={this.state.totalRows} page={this.state.currentPage} onChangePage={(event, page) => { this.handleNextPageChange(page) /* handle page size change : event.target.value */ }} />
          }}
          title="Documentos"
          detailPanel={rowData => {
            return (
              <div>
                <p>{rowData.title}</p>
                <br></br>
                <p>{rowData.description}</p>
              </div>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      )
    }

  }
}

export default (WikilegisDocumentsTableReport);