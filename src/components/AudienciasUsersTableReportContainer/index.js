import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';



class AudienciasUserTableReport extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'username', title: 'Username',  align: 'center'},
    { field: 'first_name', title: 'Nome' },
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
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: [ ],
    };
  }
  
  loadDataInTable(callback){
    //https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true
    const url = new URL("https://edemocracia.camara.leg.br/audiencias/api/room/?ordering=-created&is_visible=true")

    fetch(url, {
      method: 'GET',
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ rows: responseJson.results });
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
    
    //callback();
  }
  
  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      //this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      //});
      
    }
  }
    
  render(){
    const loading = this.state.isLoadingTable

    if(loading){
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    }else{
      return (
          <MaterialTable
            columns={this.columns}
            data={query =>
              new Promise((resolve, reject) => {
                let url = 'https://edemocracia.camara.leg.br/audiencias/api/user/'
                url += '?page=' + (query.page + 1)
                console.log(url)
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.results,
                      page: result.next.match(/\d+/g) - 1,
                      totalCount: result.count
                    })
                  })
              })
            }
            options={{
              filtering: true,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              pageSizeOptions:[20, 40, 60, 80, 100],
              exportFileName: "usuarios_audiencias_interativas",
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
            title="Usuários"
          />
      )
    }

  }
}

export default (AudienciasUserTableReport);