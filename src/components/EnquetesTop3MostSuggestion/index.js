import * as React from "react";
import Paper from "@material-ui/core/Paper";
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

const ano_2017 = [
  {
    enquete: "Enquete A",
    suggestions: 50,
  },
  {
    enquete: "Enquete B",
    suggestions: 30,
  },
  {
    enquete: "Enquete C",
    suggestions: 20,
  }
]

const ano_2018 = [
  {
    enquete: "Enquete A",
    suggestions: 200,
  },
  {
    enquete: "Enquete B",
    suggestions: 150,
  },
  {
    enquete: "Enquete C",
    suggestions: 100,
  }
]

const ano_2019 = [
  {
    enquete: "Enquete A",
    suggestions: 100,
  },
  {
    enquete: "Enquete B",
    suggestions: 80,
  },
  {
    enquete: "Enquete C",
    suggestions: 50,
  }
]

class EnqueteTop3MostSuggestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ano: 2019,
    }
  }

  update_chart() {
    let ano_data = []
    if (this.props.ano == "2017") {
      ano_data = ano_2017
    } else if (this.props.ano == "2018") {
      ano_data = ano_2018
    } else {
      ano_data = ano_2019
    }

    return ano_data
  }


  render() {
    const data_ano = this.update_chart()
    return (
      < Chart data={data_ano} >
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

        <Title text={"Enquetes com mais sugestões " + this.props.ano} />
        <Stack />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart >
    );
  }
}

export default EnqueteTop3MostSuggestion;
