import React from 'react';
import { Title, BarSeries, Chart, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function WikilegisProjectsPerTheme() {
	return (
		<Chart
      data={[
      { tema: "Esportes", quant: 1},
      { tema: "Comunicações", quant: 2},
      { tema: "Meio Ambiente" , quant: 1},
      { tema: "Cultura", quant: 1},
      { tema: "Segurança", quant: 1}
      ]}> 
    <ArgumentAxis />
    <ValueAxis />
    <BarSeries valueField="quant" argumentField="tema" />
    <Title text="Projetos por tema no Wikilegis" />
    </Chart>
	)
}
export default WikilegisProjectsPerTheme;