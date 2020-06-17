import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WikilegisDocumentTableReport from "../../components/Wikilegis/WikilegisDocumentTableReportContainer";
import WikilegisUserTableReport from "../../components/Wikilegis/WikilegisUsersTableReportContainer";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"

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

class WikilegisReportPage extends Component {
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
    return (
      <React.Fragment>
          <ExpansionPanel defaultExpanded={false}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Relatório Wikilegis - Documentos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                    <Grid container>
                      <Grid item xs={12}>
                        <WikilegisDocumentTableReport></WikilegisDocumentTableReport>
                      </Grid>
                    </Grid>  
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <br></br>
          <Divider></Divider>
          <br></br>

          <ExpansionPanel defaultExpanded={false}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Relatório Wikilegis - Usuários</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <WikilegisUserTableReport></WikilegisUserTableReport>
                  </Grid>
                </Grid>                
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(WikilegisReportPage);
