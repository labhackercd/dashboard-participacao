import React, { Component } from 'react';
import { GoogleDataChart } from 'react-analytics-widget'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Title, Legend, BarSeries, PieSeries, Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";


class WikilegisCharts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ done: true });
    }, 2500);
  }

  render() {
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

            <Divider />


                    <Chart
            data={[
              { gender: "masc", quant: 1212},
              { gender: "fem", quant: 3201},
            ]}
          > 
            <ArgumentAxis />
            <ValueAxis />
            <PieSeries valueField="quant" argumentField="gender" />
            <Title text="Usuários por gênero no Wikilegis" />
          </Chart>
    </div>
    )
  }
}

export default WikilegisCharts;