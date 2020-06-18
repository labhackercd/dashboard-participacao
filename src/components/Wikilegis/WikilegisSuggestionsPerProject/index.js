import React from "react";
import {
  Title,
  BarSeries,
  Tooltip,
  Chart,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";

function WikilegisSuggestionsPerProjects(props) {
  return (
    <Chart data={props.data}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="quant" argumentField="project" />
      <Title text="Sugestões por projeto no Wikilegis" />
      <EventTracker />
      <Tooltip />
      <Animation />
    </Chart>
  );
}

export default WikilegisSuggestionsPerProjects;
