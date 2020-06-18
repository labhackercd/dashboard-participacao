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

export default function EnquetesYearSuggestion(props) {
  let data = props.data 
  let ano = props.ano.toString()
  const [anoObject, setAnoObject] = useState(updateChart(data,ano)) 
  return (
    <Box>
      <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
        <CSVLink
          data={anoObject}
          filename={"sugestoes-enquetes_" + ano + ".csv"}
          className="btn btn-primary"
        >
          Exportar csv
        </CSVLink>
      </Box>
      <Chart data={anoObject}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Sugestões"
          valueField="suggestions"
          argumentField="month"
          color="#3498DB"
        />
        <Animation />
        <Legend
          position="bottom"
          rootComponent={Root}
          labelComponent={Label}
        />

        <Title text={"Enquetes " + ano} />
        <Stack />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Box>
  )
}