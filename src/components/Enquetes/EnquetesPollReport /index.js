import React, { Component } from "react";
import MaterialTable from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";

import Box from "@material-ui/core/Box";

import data_enquetes from "./data_enquetes";

class EnquetesPollReport extends Component {
  _isTableMounted = false;
  columns_votes = [
    { field: "name", title: "Título da Enquete", tooltip: "Título da Enquete" },
    {
      field: "participants_count",
      title: "Participantes",
      tooltip: "Número de participantes de uma enquete."
    },
    {
      field: "agree_votes",
      title: "Concordam Totalmente",
      tooltip: "Número de votos que concordam totalmente em uma enquete."
    },
    {
      field: "partial_agree_votes",
      title: "Concordam Parcialmente",
      tooltip: "Número de votos que concordam parcialmente em uma enquete."
    },
    {
      field: "indecisive_votes",
      title: "Indecisos",
      tooltip: "Número de votos que estão indeciso em uma enquete."
    },
    {
      field: "partial_disagree_votes",
      title: "Desconcordam Parcialmente",
      tooltip: "Número de votos que desconcordam parcialmente em uma enquete."
    },
    {
      field: "disagree_votes",
      title: "Desconcordam Totalmente",
      tooltip: "Número de votos que desconcordam totalmente em uma enquete."
    },
    {
      field: "total_votes_count",
      title: "Votos totais",
      tooltip: "Número de votos em uma enquete."
    }
  ];

  columns_suggestions = [
    { field: "name", title: "Título da Enquete", tooltip: "Título da Enquete" },
    {
      field: "participants_count",
      title: "Participantes",
      tooltip: "Número de participantes de uma enquete."
    },
    {
      field: "positive_suggestions",
      title: "Sugestões Favoráveis",
      tooltip: "Número de sugestões favoráveis de uma enquete."
    },
    {
      field: "negative_suggestions",
      title: "Sugestões Contrários",
      tooltip: "Número de sugestões contrárias de uma enquete."
    },
    {
      field: "suggestions_count",
      title: "Sugestões totais",
      tooltip: "Número de sugestões em uma enquete."
    },
    {
      field: "like_suggestions",
      title: "Curtir",
      tooltip: "Número de curtidas em sugestões da enquete."
    },
    {
      field: "dislike_suggestions",
      title: "Descurtir",
      tooltip: "Número de descurtidas em sugestões da enquete."
    },
    {
      field: "opinion_count",
      title: "Total de Curtir e Descutir",
      tooltip: "Número de votos em uma sugestão da enquete."
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable: true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage: 10,
      rows: []
    };
  }

  loadDataInTable(callback) {
    this.setState({ rows: data_enquetes });
    callback();
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
            columns={this.columns_votes}
            data={this.state.rows}
            options={{
              filtering: true,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              exportFileName: "enquetes",
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30, 40, 50, 100, 200],
              emptyRowsWhenPaging: false,
              removable: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Nenhum resultado encontrado"
              },
              toolbar: {
                searchTooltip: "Pesquisar",
                searchPlaceholder: "Pesquisar"
              },
              pagination: {
                labelRowsSelect: "Linhas",
                labelDisplayedRows: " {from}-{to} de {count}",
                firstTooltip: "Primeira página",
                previousTooltip: "Página Anterior",
                nextTooltip: "Próxima página",
                lastTooltip: "Última página"
              }
            }}
            title="Votos"
          />

          <br></br>

          <MaterialTable
            columns={this.columns_suggestions}
            data={this.state.rows}
            options={{
              filtering: true,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              exportFileName: "sugestoes",
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30, 40, 50, 100, 200],
              emptyRowsWhenPaging: false,
              removable: true
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Nenhum resultado encontrado"
              },
              toolbar: {
                searchTooltip: "Pesquisar",
                searchPlaceholder: "Pesquisar"
              },
              pagination: {
                labelRowsSelect: "Linhas",
                labelDisplayedRows: " {from}-{to} de {count}",
                firstTooltip: "Primeira página",
                previousTooltip: "Página Anterior",
                nextTooltip: "Próxima página",
                lastTooltip: "Última página"
              }
            }}
            title="Sugestões"
          />
        </Box>
      );
    }
  }
}

export default EnquetesPollReport;