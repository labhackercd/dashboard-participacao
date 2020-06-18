import * as React from "react";
import {useState} from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";
import Box from "@material-ui/core/Box";
import {updateChart} from "../../Utils";

import { CSVLink } from "react-csv";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row"
  }
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap"
  }
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

export default function EnqueteTop5MostVoted(props) {
  let data = props.data
  let ano = props.ano.toString()
  const [anoObject] = useState(updateChart(data,ano)) 
  return (
      <Box>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink
            data={anoObject}
            filename={"enquetes_mais_votadas_" + ano + ".csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>
        <Chart data={anoObject}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Votos Positivos"
            valueField="positive"
            argumentField="enquete"
            color="#2F9728"
          />
          <BarSeries
            name="Votos Negaticos"
            valueField="negative"
            argumentField="enquete"
            color="#C70039"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />

          <Title text={"Enquetes mais votadas " + ano} />
          <Stack />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>    
  )
}

