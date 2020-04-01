import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';

import Box from '@material-ui/core/Box';

import {AUDIENCIAS_ROOM_API_URL} from '../../config_constants'

class AudienciasRoomsTableReport extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'title_reunion', title: 'Título da Reunião', tooltip:'Título da Reunião'},
    { field: 'date', title: 'Data', tooltip:'Data/Hora de realização' },
    { field: 'questions_count', title: 'Perguntas', tooltip:'Número de perguntas enviadas para a audiência' },
    { field: 'answered_questions_count', title: 'Perguntas Respondidas', tooltip:'Número de perguntas enviadas respondidas durante a audiência.'},
    { field: 'messages_count', title: 'Mensagens', tooltip:'Número de mensagens no chat da audiência interativa.' },
    { field: 'votes_count', title: 'Votos em Perguntas', tooltip:'Número de votos em perguntas enviadas.' },
    { field: 'participants_count', title: 'Participantes', tooltip: 'Número de participantes que interagiram com a audiência(perguntou/voto/comentou).'},
    { field: 'legislative_body_initials', title: 'Comissão', tooltip: 'Sigla da comissão organizadora da audiência'}
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
    const url = new URL(AUDIENCIAS_ROOM_API_URL)

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
      this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      });
      
    }
  }
    
  render(){
    const loading = this.state.isLoadingTable

    if(loading){
      return <div align="center"> <CircularProgress></CircularProgress> </div>
    }else{
      return (
          <Box width="auto" display="flex">
              <MaterialTable
                columns={this.columns}
                data={this.state.rows}
                options={{
                  filtering: true,
                  sorting: true,
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: "salas_audiencias_interativas",
                  pageSize:5,
                  pageSizeOptions:[5, 10, 20, 30, 40, 50, 100, 200],
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
                title="Salas"
                detailPanel={rowData => {
                  return (
                    <div>
                      <p>{rowData.reunion_object}</p>
                      <br></br>
                      <p>{rowData.legislative_body}</p>
                    </div>
                  )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
              />
          </Box>

      )
    }

  }
}

export default (AudienciasRoomsTableReport);