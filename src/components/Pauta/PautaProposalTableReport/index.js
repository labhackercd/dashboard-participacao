import React, { Component } from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box"
import { TablePagination } from "@material-ui/core";
import {PAUTA_PAGED_DOCUMENT_API_URL} from "../../../config_constants";

class PautaProposalTableReport extends Component {
  _isTableMounted = false;
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
      filtering: true,
      sorting: true,
      exportButton: true,
      exportAllData: true,
      exportFileName: "pauta_proposal_table_report",
      isLoadingTable: true,
      currentPage: 0,
      setPage: 0,
      rows: [],
      totalRows: 0,
      search: true, 
      nextPageURL: "?limit=20&offset=0",
      data: {}
    };
  }

  loadDataInTable(callback) {
    const url = new URL(
      PAUTA_PAGED_DOCUMENT_API_URL + this.state.nextPageURL
    );

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          rows: data.objects,
          totalRows: data.meta.total_count,
          nextPageURL: data.meta.next
        });
        callback();
      })
      .catch((error) => {
        console.error(error);
      });

    //callback();
  }

  handleNextPageChange(page) {
    this.setState({ isLoadingTable: true, currentPage: page });

    const url = new URL(
      'https://edemocracia.camara.leg.br' + this.state.nextPageURL
    );

    console.log(url)

    fetch(url, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ rows: data.objects });
      this.setState({ isLoadingTable: false });
      data.meta.next ? this.setState({ nextPageURL: data.meta.next }) : this.setState({ nextPageURL: data.meta.previous});
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

  handleNextPageChangeTeste(e, p) {
    this.handleNextPageChange(p);
  }

  render() {
    const loading = this.state.isLoadingTable;

    if (loading) {
      return (
        <div align="center">
          {" "}
          <CircularProgress></CircularProgress>{" "}
        </div>
      );
    } else {
      return (
        <Box width="auto" display="inline">
        <MaterialTable
          columns={this.columns}
          data={this.state.rows}
          options={{
            pageSize: 20,
            pageSizeOptions: [20],
            emptyRowsWhenPaging: false,
            removable: true,
            search: true,
            exportButton: true,
            exportAllData: true,
            exportFileName: "pauta_proposal_table_report",
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Nenhum resultado encontrado",
            },
            toolbar: {
              searchTooltip: "Pesquisar",
              searchPlaceholder: "Pesquisar",
            },
            pagination: {
              labelRowsSelect: "Linhas",
              labelDisplayedRows: " {from}-{to} de {count}",
              firstTooltip: "Primeira página",
              previousTooltip: "Página Anterior",
              nextTooltip: "Próxima página",
              lastTooltip: "Última página",
            },
          }}
          components={{
            Pagination: (props) => (
              <TablePagination
                {...props}
                count={this.state.totalRows}
                page={this.state.currentPage}
                onChangePage={(event, page) => {
                  this.handleNextPageChangeTeste(
                    event,
                    page
                  ); /* handle page size change : event.target.value */
                }}
              />
            ),
          }}
          title="Usuários"
        />
        </Box>
      );
    }
  }
}

export default PautaProposalTableReport;
