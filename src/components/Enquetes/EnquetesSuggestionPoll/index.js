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

export default function EnquetesSuggestionPoll(props) {
  function update_chart() {
    return [{vote: "Positivo", count: props.enquete.positive_suggestions},
            {vote: "Negativo", count: props.enquete.negative_suggestions}];    
  }
  const data = update_chart()
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
        <Title text={"Sugestões da Enquete " + props.enquete.name} />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Box>    
  )
}
