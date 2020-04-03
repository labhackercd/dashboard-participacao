import * as React from "react";
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";

import { Animation, EventTracker } from "@devexpress/dx-react-chart";
import Box from "@material-ui/core/Box";

import { CSVLink } from "react-csv";

class EnquetesVotesPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.enquete
    };
  }

  update_chart() {
    const enquete = this.props.enquete;
    const enquete_format = [
      { vote: "Concordo Totalmente", count: enquete.partial_agree_votes },
      { vote: "Concordo na maior parte", count: enquete.partial_agree_votes },
      { vote: "Estou indeciso", count: enquete.indecisive_votes },
      {
        vote: "Discordo na maior parte",
        count: enquete.partial_disagree_votes
      },
      { vote: "Discordo Totalmente", count: enquete._disagree_votes }
    ];
    return enquete_format;
  }

  render() {
    const data = this.update_chart();
    return (
      <Box>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink
            data={data}
            filename={"votos_enquetes.csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>

        <Chart data={data}>
          <PieSeries valueField="count" argumentField="vote" />
          <Legend />
          <Title text={"Votos da Enquete " + this.props.enquete.name} />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>
    );
  }
}

export default EnquetesVotesPoll;
