import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ForumIcon from "@material-ui/icons/Forum";
import ChatIcon from "@material-ui/icons/Chat";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import AudienciasMadeChart from "../../components/Audiencias/AudienciasMadeCharts";
import AudienciasGenderChart from "../../components/Audiencias/AudienciasGenderChart";
import AudienciasUserChart from "../../components/Audiencias/AudienciasUsersChart";
import AudienciasAgeUsersChart from "../../components/Audiencias/AudienciasAgeUsersChart";
import AudienciasParticipationBrazilMap from "../../components/Audiencias/AudienciasParticipationBrazilMap";
import AudienciasTypeChart from "../../components/Audiencias/AudiencesTypeChart"

//Data imports 
import { AudienciasTypeChartData, 
         AudienciasAgeUsersChartData,
         AudienciasComissionChartData, 
         AudienciasGenderChartData,
         AudienciasMadeChartData,
         AudienciasUsersChartData,
         dataEstadosGeral,
         dataEstados1, 
         dataEstados2, 
         dataEstados3, 
         dataEstados4,
         audiencesList } from "../API"

const useStyles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: "theme.palette.common.white",
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tableRoot: {
    width: "100%",
  },
  tableWrapper: {
    overflow: "auto",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AudienciasReportPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    /*
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {
          this.setState({isLoadingPage:false});
      });
    }
    */
    this.setState({ isLoadingPage: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }

  render() {
    const dataEstados = [dataEstadosGeral,dataEstados1,dataEstados2,dataEstados3,dataEstados4] 
    return (
      <React.Fragment>
        
          <Box mb={3}>
            <Alert severity="info">
              Este é um texto de alerta para avisar sobre os dados!
            </Alert>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3} zeroMinWidth>
                <UsersInfoCard></UsersInfoCard>
              </Grid>
              <Grid item xs={12} md={6} lg={3} zeroMinWidth>
                {AudiencesInfoCard()}
              </Grid>
              <Grid item xs={12} md={6} lg={3} zeroMinWidth>
                {MessagesInfoCard()}
              </Grid>
              <Grid item xs={12} md={6} lg={3} zeroMinWidth>
                {QuestionsInfoCard()}
              </Grid>

              <Grid item xs={12} md={4} zeroMinWidth>
                <Box width="100%" height="100%">
                  <AudienciasGenderChart data={AudienciasGenderChartData}></AudienciasGenderChart>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4} zeroMinWidth>
                <Box>
                  <AudienciasUserChart data={AudienciasUsersChartData}></AudienciasUserChart>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4} zeroMinWidth>
                <Box>
                  <AudienciasTypeChart data={AudienciasTypeChartData}></AudienciasTypeChart>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4} zeroMinWidth>
                <Box>
                  <AudienciasMadeChart data={AudienciasMadeChartData}></AudienciasMadeChart>
                </Box>
              </Grid>
              <Grid item xs={12} lg={8} zeroMinWidth>
                <Box>
                  <AudienciasAgeUsersChart data={AudienciasAgeUsersChartData}></AudienciasAgeUsersChart>
                </Box>
              </Grid>
              <Grid item xs={12} zeroMinWidth>
                <Box>
                  <AudienciasParticipationBrazilMap data={{dataEstados: dataEstados, audiencesList: audiencesList}}></AudienciasParticipationBrazilMap>
                </Box>
              </Grid>
            </Grid>
          </Box>
 
      </React.Fragment>
  
    );
  }
}

function UsersInfoCard() {
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <PersonOutlineIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item xs={4}>
              <Box marginTop={1}>
                <Typography component="p" variant="h4">
                  72.000
                </Typography>
                <Typography color="textSecondary">usuários</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function AudiencesInfoCard() {
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <ForumIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item>
              <Box marginTop={1}>
                <Typography component="p" variant="h4">
                  150
                </Typography>
                <Typography color="textSecondary">
                  audiências Interativas
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function MessagesInfoCard() {
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <ChatIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item xs={4}>
              <Box marginTop={1}>
                <Typography component="p" variant="h4">
                  125.231
                </Typography>
                <Typography color="textSecondary">mensagens</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

function QuestionsInfoCard() {
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <HelpOutlineIcon style={{ fontSize: '500%' }} />
            </Grid>
            <Grid item xs={4}>
              <Box marginTop={1}>
                <Typography component="p" variant="h4">
                  2100
                </Typography>
                <Typography color="textSecondary">perguntas</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(useStyles)(AudienciasReportPage);
