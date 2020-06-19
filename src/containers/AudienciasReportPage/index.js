import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import AudienciasRoomsTableReport from "../../components/Audiencias/AudienciasRoomsTableReportContainer";
import AudienciasUserTableReport from "../../components/Audiencias/AudienciasUsersTableReportContainer";


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
      snackBarMessageError: "",
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
    const textReportUser = "Para um melhor desempenho do relatório as consultas de dados estão limitadas a uma paginação de 100 linhas, logo quando for feito o download  ou outra consulta dos dados os resultados serão limitados a essas informações carregadas. Estamos trabalhando em uma melhor implementação dessa visualização."
    const textReportRoom = "Todos os dados estão sendo buscados. A consulta deve demorar alguns instantes." 
    return (
      <React.Fragment>
          <Box mb={5}>
            <Alert severity="info">
              Estes dados são consultados diretamente da API do Audiências.
            </Alert>
          </Box>
          <Box>
            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Relatório Audiências - Eventos interativos</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Box marginY={2}>
                      <TransitionAlerts text={textReportRoom}></TransitionAlerts>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <AudienciasRoomsTableReport ></AudienciasRoomsTableReport>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <br></br>

            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Relatório Audiências - Usuários</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Box marginY={2}>
                    <TransitionAlerts text={textReportUser}></TransitionAlerts>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <AudienciasUserTableReport></AudienciasUserTableReport>
                      </Grid>
                    </Grid>          
                  </Grid>
                </Grid>
                
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </React.Fragment>
    );
  }
}

function TransitionAlerts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity="info"
          variant="standard"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.text}
        </Alert>
      </Collapse>
    </div>
  );
}

export default withStyles(useStyles)(AudienciasReportPage);
