import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";

export default function EnquetesCardParticipants (props) {
    return (
      <React.Fragment>
        <Paper elevation={3} square={false} rounded={5}>
          <Box marginX={2} marginY={2}>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <PeopleIcon style={{ fontSize: 70 }} />
              </Grid>
              <Grid item>
                <Box marginTop={1}>
                  <Typography component="p" variant="h4">
                    {props.participants}
                  </Typography>
                  <Typography color="textSecondary">
                    Total de participantes
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    );  
}