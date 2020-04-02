import * as React from "react";
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

const ano_2017 = [
  {
    month: "Janeiro",
    suggestions: 20
  },
  {
    month: "Fevereiro",
    suggestions: 30
  },
  {
    month: "Março",
    suggestions: 13
  },
  {
    month: "Abril",
    suggestions: 7
  },
  {
    month: "Maio",
    suggestions: 7
  },
  {
    month: "Junho",
    suggestions: 16
  },
  {
    month: "Julho",
    suggestions: 30
  },
  {
    month: "Agosto",
    suggestions: 160
  },
  {
    month: "Setembro",
    suggestions: 106
  },
  {
    month: "Outubro",
    suggestions: 50
  },
  {
    month: "Novembro",
    suggestions: 15
  },
  {
    month: "Dezembro",
    suggestions: 74
  }
];

const ano_2018 = [
  {
    month: "Janeiro",
    suggestions: 40
  },
  {
    month: "Fevereiro",
    suggestions: 30
  },
  {
    month: "Março",
    suggestions: 30
  },
  {
    month: "Abril",
    suggestions: 10
  },
  {
    month: "Maio",
    suggestions: 30
  },
  {
    month: "Junho",
    suggestions: 20
  },
  {
    month: "Julho",
    suggestions: 10
  },
  {
    month: "Agosto",
    suggestions: 100
  },
  {
    month: "Setembro",
    suggestions: 40
  },
  {
    month: "Outubro",
    suggestions: 10
  },
  {
    month: "Novembro",
    suggestions: 65
  },
  {
    month: "Dezembro",
    suggestions: 50
  }
];

const ano_2019 = [
  {
    month: "Janeiro",
    suggestions: 30
  },
  {
    month: "Fevereiro",
    suggestions: 20
  },
  {
    month: "Março",
    suggestions: 53
  },
  {
    month: "Abril",
    suggestions: 27
  },
  {
    month: "Maio",
    suggestions: 37
  },
  {
    month: "Junho",
    suggestions: 76
  },
  {
    month: "Julho",
    suggestions: 50
  },
  {
    month: "Agosto",
    suggestions: 30
  },
  {
    month: "Setembro",
    suggestions: 54
  },
  {
    month: "Outubro",
    suggestions: 57
  },
  {
    month: "Novembro",
    suggestions: 40
  },
  {
    month: "Dezembro",
    suggestions: 24
  }
];

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

class EnquetesYearSuggestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ano: 2019
    };
  }

  update_chart() {
    let ano_data = [];
    if (this.props.ano === "2017") {
      ano_data = ano_2017;
    } else if (this.props.ano === "2018") {
      ano_data = ano_2018;
    } else {
      ano_data = ano_2019;
    }

    return ano_data;
  }

  render() {
    const data = this.update_chart();

    return (
      <Box>
        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
          <CSVLink
            data={data}
            filename={"sugestoes-enquetes_" + this.state.ano + ".csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Sugestões"
            valueField="suggestions"
            argumentField="month"
            color="#3498DB"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />

          <Title text={"Enquetes " + this.props.ano} />
          <Stack />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>
    );
  }
}

export default EnquetesYearSuggestion;
