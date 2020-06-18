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

function WikilegisGenderChart() {
  let [genderData] = useState([
    { gender: "masc", quant: 1212 },
    { gender: "fem", quant: 3201 },
  ]);

  return (
    <Chart data={genderData} className="wikilegis-gender-chart">
      <PieSeries
        valueField="quant"
        argumentField="gender"
        innerRadius={0.6}
        name="genero-usuario"
      />
      <Title text="Usuários por gênero no Wikilegis" />
      <EventTracker />
      <Tooltip />
      <Legend />
      <Animation />
    </Chart>
  );
}

export default WikilegisGenderChart;
