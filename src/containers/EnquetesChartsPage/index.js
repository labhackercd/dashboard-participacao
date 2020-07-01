import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
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
import {top3MostSuggestionByYear, top5MostVoted, enquetesYearSuggestionData,enquetesYearVotesData} from "../API/enquetes"

import {ENQUETES_STATISTICS_RESUME_DATA_API_URL} from "../../config_constants" 

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
      generalData:[]
    };

    this.handleChangeEnquete = this.handleChangeEnquete.bind(this);
  }


  fetchApiGeneralData(callback) {
    console.log(ENQUETES_STATISTICS_RESUME_DATA_API_URL);
    const url = new URL(ENQUETES_STATISTICS_RESUME_DATA_API_URL);

    //TODO CORRECT THIS LOAD RETURN THAT DON'T HAVE ANY DATA
    fetch(url, {
      method: "GET",
      mode: 'cors',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.setState({
        generalData: data
      });

      console.log(this.state.generalData)
      callback();
    })
    .catch((error) => {
      console.error(error);
    });

    //callback();
  }


  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.fetchApiGeneralData(() => {
        this.setState({ isLoadingPage: false });
      });
    }
    console.log(this.state.generalData)

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
        <React.Fragment>
          <Box mb={5}>
            <Alert severity="info">
              Os dados contidos nesta página são fictícios!
            </Alert>
          </Box>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <Box width="100%" height="100%">
                  <Paper style={{ padding: "1rem" }}>
                    <center>
                      <h1 style={{ margin: "1rem 0 1rem 0" }}> Enquete </h1>
                    </center>
                    <p
                      style={{
                        lineHeight: 2,
                        fontSize: 20,
                        textAlign: "justify",
                        margin: "0 1.5rem 0 1.5rem",
                      }}
                    >
                      A Enquete é uma ferramente que possibilita opinar sobre
                      qualquer proposta legislativa, indicando seus pontos
                      positivos ou negativos ou, ainda, votando nas opiniões de
                      outros cidadãos. O objetivo dessa ferramenta é oferecer à
                      sociedade mais um canal direto de manifestação. As
                      enquetes não têm rigor científico, pois não representam
                      uma amostra da sociedade. Seus resultados ficam
                      disponíveis para os relatores das propostas, que podem
                      considerar as manifestações na preparação do texto a ser
                      votado.
                    </p>
                    <br />
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <br></br>
            <Divider></Divider>
            <br></br>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardVotes votes={this.state.generalData.count_likes}></EnquetesCardVotes>
              </Grid>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardSuggestions
                  suggestions={this.state.generalData.count_responses}
                ></EnquetesCardSuggestions>
              </Grid>
              <Grid item xs={12} md={4} zeroMinWidth>
                <EnquetesCardParticipants
                  participants={this.state.generalData.users_participations}
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
                        data={enquetesYearVotesData}
                        redraw={true}
                      ></EnquetesYearVotes>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12} zeroMinWidth>
                    <Box>
                      <EnquetesYearSuggestion
                        ano={this.state.ano}
                        data={enquetesYearSuggestionData}
                        redraw={true}
                      ></EnquetesYearSuggestion>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesTop5MostVoted
                        ano={this.state.ano}
                        data={top5MostVoted}
                        redraw={true}
                      ></EnquetesTop5MostVoted>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} zeroMinWidth>
                    <Box>
                      <EnquetesTop3MostSuggestion
                        ano={this.state.ano}
                        data={top3MostSuggestionByYear}
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
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(useStyles)(EnquetesChartsPage);
