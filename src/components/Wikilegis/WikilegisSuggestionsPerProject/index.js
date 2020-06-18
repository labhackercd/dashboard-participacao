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

function WikilegisSuggestionsPerProjects() {
  const suggestionsPerProject = [
    { project: "1", quant: 72 },
    { project: "2", quant: 53 },
    { project: "3", quant: 14 },
  ];

  return (
    <Chart data={suggestionsPerProject}>
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
