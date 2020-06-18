// import * as React from "react";
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   BarSeries,
//   Title,
//   Legend,
//   Tooltip
// } from "@devexpress/dx-react-chart-material-ui";
// import { withStyles } from "@material-ui/core/styles";
// import { Stack, Animation } from "@devexpress/dx-react-chart";
// import { EventTracker } from "@devexpress/dx-react-chart";
// import Box from "@material-ui/core/Box";

// import { CSVLink } from "react-csv";

// const legendStyles = () => ({
//   root: {
//     display: "flex",
//     margin: "auto",
//     flexDirection: "row"
//   }
// });
// const legendRootBase = ({ classes, ...restProps }) => (
//   <Legend.Root {...restProps} className={classes.root} />
// );
// const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
// const legendLabelStyles = () => ({
//   label: {
//     whiteSpace: "nowrap"
//   }
// });
// const legendLabelBase = ({ classes, ...restProps }) => (
//   <Legend.Label className={classes.label} {...restProps} />
// );
// const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
//   legendLabelBase
// );

// const ano_2017 = [
//   {
//     enquete: "Enquete A",
//     suggestions: 50
//   },
//   {
//     enquete: "Enquete B",
//     suggestions: 30
//   },
//   {
//     enquete: "Enquete C",
//     suggestions: 20
//   }
// ];

// const ano_2018 = [
//   {
//     enquete: "Enquete A",
//     suggestions: 200
//   },
//   {
//     enquete: "Enquete B",
//     suggestions: 150
//   },
//   {
//     enquete: "Enquete C",
//     suggestions: 100
//   }
// ];

// const ano_2019 = [
//   {
//     enquete: "Enquete A",
//     suggestions: 100
//   },
//   {
//     enquete: "Enquete B",
//     suggestions: 95
//   },
//   {
//     enquete: "Enquete C",
//     suggestions: 50
//   }
// ];

// class EnqueteTop3MostSuggestion extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       ano: 2019
//     };
//   }

//   update_chart() {
//     let ano_data = [];
//     if (this.props.ano === "2017") {
//       ano_data = ano_2017;
//     } else if (this.props.ano === "2018") {
//       ano_data = ano_2018;
//     } else {
//       ano_data = ano_2019;
//     }

//     return ano_data;
//   }

//   render() {
//     const data_ano = this.update_chart();
//     return (
//       <Box>
//         <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
//           <CSVLink
//             data={data_ano}
//             filename={"enquetes_mais_sugestoes_" + this.state.ano + ".csv"}
//             className="btn btn-primary"
//           >
//             Exportar csv
//           </CSVLink>
//         </Box>
//         <Chart data={data_ano}>
//           <ArgumentAxis />
//           <ValueAxis />

//           <BarSeries
//             name="Sugestões"
//             valueField="suggestions"
//             argumentField="enquete"
//             color="#3498DB"
//           />
//           <Animation />
//           <Legend
//             position="bottom"
//             rootComponent={Root}
//             labelComponent={Label}
//           />

//           <Title text={"Enquetes com mais sugestões " + this.props.ano} />
//           <Stack />
//           <Animation />
//           <EventTracker />
//           <Tooltip />
//         </Chart>
//       </Box>
//     );
//   }
// }

// export default EnqueteTop3MostSuggestion;


import * as React from "react";
import {useState, useEffect} from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";
import Box from "@material-ui/core/Box";

import { CSVLink } from "react-csv";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row"
  }
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap"
  }
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

/**
 *
 * Receives an object containing data for all years and returns chart-friendly data for a specific year
 *
 * @param {Object} data Object which contains chart data for all years
 * @param {String} ano  String which represents the desidered year
 *
 * @return {Array} Array of chart-friendly objects containing data for a specific year.
 */

function updateChart(data, ano){
  let filterPerYear = data.filter((year) => Object.keys(year) == ano)
  let valuesForYear = filterPerYear[0]
  return Object.values(valuesForYear)[0]
}

export default function EnqueteTop3MostSuggestion(props) {
    let data = props.data 
    let ano = props.ano.toString()
    const [anoObject, setAnoObject] = useState(updateChart(data,ano)) 
    return (
      <Box>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink
            data={anoObject}
            filename={"enquetes_mais_sugestoes_" + ano + ".csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>
        <Chart data={anoObject}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            name="Sugestões"
            valueField="suggestions"
            argumentField="enquete"
            color="#3498DB"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text={"Enquetes com mais sugestões " + ano} />
          <Stack />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>      
    )
}

// class EnqueteTop3MostSuggestion extends React.Component {

//   render() {
//     const data_ano = this.update_chart();
//     return (
//       <Box>
//         <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
//           <CSVLink
//             data={data_ano}
//             filename={"enquetes_mais_sugestoes_" + this.state.ano + ".csv"}
//             className="btn btn-primary"
//           >
//             Exportar csv
//           </CSVLink>
//         </Box>
//         <Chart data={data_ano}>
//           <ArgumentAxis />
//           <ValueAxis />

//           <BarSeries
//             name="Sugestões"
//             valueField="suggestions"
//             argumentField="enquete"
//             color="#3498DB"
//           />
//           <Animation />
//           <Legend
//             position="bottom"
//             rootComponent={Root}
//             labelComponent={Label}
//           />

//           <Title text={"Enquetes com mais sugestões " + this.props.ano} />
//           <Stack />
//           <Animation />
//           <EventTracker />
//           <Tooltip />
//         </Chart>
//       </Box>
//     );
//   }
// }

// export default EnqueteTop3MostSuggestion;

// constructor(props) {
//   super(props);

//   this.state = {
//     ano: 2019
//   };
// }

// update_chart() {
//   let ano_data = [];
//   if (this.props.ano === "2017") {
//     ano_data = ano_2017;
//   } else if (this.props.ano === "2018") {
//     ano_data = ano_2018;
//   } else {
//     ano_data = ano_2019;
//   }

//   return ano_data;
// }

// const ano_2017 = [
//   {
//     enquete: "Enquete A",
//     suggestions: 50
//   },
//   {
//     enquete: "Enquete B",
//     suggestions: 30
//   },
//   {
//     enquete: "Enquete C",
//     suggestions: 20
//   }
// ];

// const ano_2018 = [

// ];

// const ano_2019 = [
//   {
//     enquete: "Enquete A",
//     suggestions: 100
//   },
//   {
//     enquete: "Enquete B",
//     suggestions: 95
//   },
//   {
//     enquete: "Enquete C",
//     suggestions: 50
//   }
// ];
