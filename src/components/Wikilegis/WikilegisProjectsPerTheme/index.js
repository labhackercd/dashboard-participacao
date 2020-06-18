import React from "react";
import {
  Title,
  BarSeries,
  Chart,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";

function WikilegisProjectsPerTheme(props) {
  return (
    <Chart
      data={props.data}
    >
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="quant" argumentField="tema" />
      <Title text="Projetos por tema no Wikilegis" />
      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  );
}
export default WikilegisProjectsPerTheme;
