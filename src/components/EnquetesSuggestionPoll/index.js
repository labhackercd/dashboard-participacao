import * as React from "react";
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import Box from "@material-ui/core/Box";

import { CSVLink } from "react-csv";

import { Animation, EventTracker } from "@devexpress/dx-react-chart";

const enquete_A = [
  { vote: "Positivo", count: 5000 },
  { vote: "Negativo", count: 3000 }
];

const enquete_B = [
  { vote: "Positivo", count: 1000 },
  { vote: "Negativo", count: 2000 }
];

const enquete_C = [
  { vote: "Positivo", count: 2000 },
  { vote: "Negativo", count: 1500 }
];

class EnquetesSuggestionPoll extends React.Component {
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
            filename={"sugestoes_enquetes.csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>

        <Chart data={data}>
          <PieSeries valueField="count" argumentField="vote" />
          <Legend />
          <Title text={"Sugestões da Enquete " + this.props.enquete} />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>
    );
  }
}

export default EnquetesSuggestionPoll;
