import React from "react";
import {
  Title,
  PieSeries,
  Legend,
  Tooltip,
  Chart,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";

function WikilegisGenderChart(props) {
  return (
    <Chart data={props.data} className="wikilegis-gender-chart">
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
