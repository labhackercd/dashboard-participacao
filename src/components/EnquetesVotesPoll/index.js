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

const enquete_A = [
  { vote: "Concordo Totalmente", count: 5000 },
  { vote: "Concordo na maior parte", count: 20 },
  { vote: "Estou indeciso", count: 0 },
  { vote: "Discordo na maior parte", count: 15 },
  { vote: "Discordo Totalmente", count: 1300 }
];

const enquete_B = [
  { vote: "Concordo Totalmente", count: 32000 },
  { vote: "Concordo na maior parte", count: 100 },
  { vote: "Estou indeciso", count: 5 },
  { vote: "Discordo na maior parte", count: 150 },
  { vote: "Discordo Totalmente", count: 5000 }
];

const enquete_C = [
  { vote: "Concordo Totalmente", count: 1123 },
  { vote: "Concordo na maior parte", count: 2341 },
  { vote: "Estou indeciso", count: 50 },
  { vote: "Discordo na maior parte", count: 2000 },
  { vote: "Discordo Totalmente", count: 50000 }
];

class EnquetesVotesPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: enquete_A
    };
  }

  update_chart() {
    let enquete = [];
    if (this.props.enquete === "C") {
      enquete = enquete_C;
    } else if (this.props.enquete === "B") {
      enquete = enquete_B;
    } else {
      enquete = enquete_A;
    }

    return enquete;
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
          <Title text={"Votos da Enquete " + this.props.enquete} />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>
    );
  }
}

export default EnquetesVotesPoll;
