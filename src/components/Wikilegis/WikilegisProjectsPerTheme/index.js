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

function WikilegisProjectsPerTheme() {
  return (
    <Chart
      data={[
        { tema: "Esportes", quant: 1 },
        { tema: "Comunicações", quant: 2 },
        { tema: "Meio Ambiente", quant: 1 },
        { tema: "Cultura", quant: 1 },
        { tema: "Segurança", quant: 1 },
      ]}
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
