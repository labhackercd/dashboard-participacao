import React, { useState } from "react";
import {
  Title,
  PieSeries,
  Legend,
  Tooltip,
  Chart,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";

function WikilegisDocumentsPerYear() {
  let [projectsPerYear] = useState([
    { year: 2019, quant: 4 },
    { year: 2018, quant: 1 },
    { year: 2015, quant: 1 },
  ]);

  return (
    <Chart data={projectsPerYear} className="wikilegis-gender-chart">
      <PieSeries
        valueField="quant"
        argumentField="year"
        innerRadius={0.6}
        name="genero-usuario"
      />
      <Title text="Projetos por ano no Wikilegis" />
      <EventTracker />
      <Tooltip />
      <Legend />
      <Animation />
    </Chart>
  );
}

export default WikilegisDocumentsPerYear;
