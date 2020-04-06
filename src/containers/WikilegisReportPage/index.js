import React, { Component } from "react";
import ResponsiveDrawer from "../MenuDrawer";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WikilegisDocumentTableReport from "../../components/Wikilegis/WikilegisDocumentTableReportContainer";
import WikilegisUserTableReport from "../../components/WikilegisUsersTableReportContainer";
import { Divider } from "@material-ui/core";

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
      <div>
        <ResponsiveDrawer title="Estatísticas Partipação Pública">
          <ExpansionPanel defaultExpanded={false}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Relatório Wikilegis - Documentos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <WikilegisDocumentTableReport></WikilegisDocumentTableReport>
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
              <WikilegisUserTableReport></WikilegisUserTableReport>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default withStyles(useStyles)(WikilegisReportPage);
