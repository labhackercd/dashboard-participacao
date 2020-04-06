import React, { Component } from "react";
import ResponsiveDrawer from "../MenuDrawer";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EnquetesSuggestionPoll from "../../components/Enquetes/EnquetesSuggestionPoll";
import EnquetesVotesPoll from "../../components/Enquetes/EnquetesVotesPoll";
import EnquetesTop5MostVoted from "../../components/Enquetes/EnquetesTop5MostVoted";
import EnquetesTop3MostSuggestion from "../../components/Enquetes/EnquetesTop3MostSuggestion";
import EnquetesYearVotes from "../../components/Enquetes/EnquetesYearVotes";
import EnquetesYearSuggestion from "../../components/Enquetes/EnquetesYearSuggestion";
import EnquetesCardVotes from "../../components/Enquetes/EnquetesCardVotes";
import EnquetesCardSuggestions from "../../components/Enquetes/EnquetesCardSuggestions";
import EnquetesCardParticipants from "../../components/Enquetes/EnquetesCardParticipants";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import data_enquetes from "../../components/Enquetes/EnquetesVotesPoll/data_enquetes";

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

class EnquetesChartsPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMessageError: "",
      enquete: data_enquetes[0],
      ano: 2019,
    };

    this.handleChangeEnquete = this.handleChangeEnquete.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isLoadingPage: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }

  handleChangeEnquete(event, values) {
    if (values === null) {
      this.setState({ enquete: data_enquetes[0] });
    } else {
      this.setState({ enquete: values });
    }
  }

  handleChangeAno = (event, values) => {
    const ano = event.target.value;
    this.setState({ ano: ano });
  };

  render() {
    return (
      <div>
        <ResponsiveDrawer title="Enquetes">
          <Box mb={5}>
            <Alert severity="info">
              Os dados contidos nesta página são fictícios!
            </Alert>
          </Box>
          <Box>
            <br></br>
            <Divider></Divider>
            <br></br>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardVotes votes={"2.643.521"}></EnquetesCardVotes>
              </Grid>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardSuggestions
                  suggestions={"17.876"}
                ></EnquetesCardSuggestions>
              </Grid>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardParticipants
                  participants={"1.634.976"}
                ></EnquetesCardParticipants>
              </Grid>
            </Grid>
            <br></br>
            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Gráficos Anuais</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} zeroMinWidth>
                    <FormControl variant="filled">
                      <InputLabel htmlFor="filled-age-native-simple">
                        Ano
                      </InputLabel>
                      <Select
                        native
                        value={this.state.ano}
                        onChange={this.handleChangeAno}
                      >
                        <option value={2017}>2017</option>
                        <option value={2018}>2018</option>
                        <option value={2019}>2019</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} zeroMinWidth>
                    <Box>
                      <EnquetesYearVotes
                        ano={this.state.ano}
                        redraw={true}
                      ></EnquetesYearVotes>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} zeroMinWidth>
                    <Box>
                      <EnquetesYearSuggestion
                        ano={this.state.ano}
                        redraw={true}
                      ></EnquetesYearSuggestion>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesTop5MostVoted
                        ano={this.state.ano}
                        redraw={true}
                      ></EnquetesTop5MostVoted>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesTop3MostSuggestion
                        ano={this.state.ano}
                        redraw={true}
                      ></EnquetesTop3MostSuggestion>
                    </Box>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <br></br>

            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Veja uma enquete</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} zeroMinWidth>
                    <Autocomplete
                      id="combo-box-demo"
                      options={data_enquetes}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 300 }}
                      onChange={this.handleChangeEnquete}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Propostas"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesSuggestionPoll
                        enquete={this.state.enquete}
                      ></EnquetesSuggestionPoll>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesVotesPoll
                        enquete={this.state.enquete}
                        redraw
                      ></EnquetesVotesPoll>
                    </Box>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </ResponsiveDrawer>
      </div>
    );
  }
}

export default withStyles(useStyles)(EnquetesChartsPage);
