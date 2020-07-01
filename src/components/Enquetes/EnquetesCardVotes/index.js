import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';



export default function EnquetesCardVotes(props) {
  return (
    <React.Fragment>
      <Paper elevation={3} square={false} rounded={5}>
        <Box marginX={2} marginY={2}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <HowToVoteIcon style={{ fontSize: 70 }} />
            </Grid>
            <Grid item>
              <Box marginTop={1}>
                <Typography component="p" variant="h4">
                 
                </Typography>
                  { props.votes
                    ? <Typography component="p" variant="h4"> {props.votes}</Typography>
                    : <CircularProgress></CircularProgress>
                  }
                <Typography color="textSecondary">Total de votos</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );  
}