import React, { Component } from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box"

import { TablePagination } from "@material-ui/core";
import { EDEMOCRACIA_PAGED_USER_API_URL } from "../../../config_constants";


class EDemocraciaUserTableReport extends Component {
  _isTableMounted = false;
  columns = [
    { field: "ID", title: "ID", align: "center" },
    { field: "profile.gender", title: "Gênero" },
    { field: "profile.uf", title: "UF" },
    { field: "profile.birthdate", title: "Data de Nascimento" },
    { field: "date_joined", title: "Data do Cadastro" },
  ];

  constructor(props) {
    super(props);
    this.state = {
      filtering: true,
      sorting: true,
      exportButton: true,
      exportAllData: true,
<<<<<<< HEAD
<<<<<<< HEAD
      exportFileName: "edemocracia_users_table_report",
=======
      exportFileName: "salas_audiencias_interativas",
>>>>>>> added search and csv export to edemocracia and pauta components
=======
      exportFileName: "edemocracia_users_table_report",
>>>>>>> minor fixes
      isLoadingTable: true,
      currentPage: 1,
      setPage: 0,
      rowsPerPage: 20,
      rows: [],
      totalRows: 0,
      search: true, 
    };
  }

  loadDataInTable(callback) {
    //https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true
    const url = new URL(
      EDEMOCRACIA_PAGED_USER_API_URL + this.state.currentPage
    );

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          rows: responseJson.results,
          totalRows: responseJson.count,
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
      EDEMOCRACIA_PAGED_USER_API_URL + this.state.currentPage
    );

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rows: responseJson.results });
        this.setState({ isLoadingTable: false });
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
            pageSize: 100,
            pageSizeOptions: [20, 40, 60, 80, 100, 80000],
            emptyRowsWhenPaging: false,
            removable: true,
            search: true,
            exportButton: true,
            exportAllData: true,
            exportFileName: "edemocracia_users_table_report",
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

export default EDemocraciaUserTableReport;
