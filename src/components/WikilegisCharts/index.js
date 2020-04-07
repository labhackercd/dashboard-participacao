import React from 'react';
import { Title, BarSeries, Chart, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import WikilegisGenderChart from '../WikilegisGenderChart';

function WikilegisCharts() {
    return (
      <div>
          <Chart
            data={[
              { tema: "Esportes", quant: 1},
              { tema: "Comunicações", quant: 2},
              { tema: "Meio Ambiente" , quant: 1},
              { tema: "Cultura", quant: 1},
              { tema: "Segurança", quant: 1}
            ]}
          > 
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="quant" argumentField="tema" />
            <Title text="Documentos por tema no Wikilegis" />
          </Chart>
<br /><br />
          <br />
          <WikilegisGenderChart />
    </div>
    )
}

export default WikilegisCharts;