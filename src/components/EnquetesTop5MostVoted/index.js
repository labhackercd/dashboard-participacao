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

const ano_2017 = [
  {
    enquete: "Enquete A",
    positive: 20,
    negative: 25
  },
  {
    enquete: "Enquete B",
    positive: 30,
    negative: 17
  },
  {
    enquete: "Enquete C",
    positive: 13,
    negative: 17
  },
  {
    enquete: "Enquete D",
    positive: 7,
    negative: 11
  },
  {
    enquete: "Enquete E",
    positive: 7,
    negative: 27
  },
  {
    enquete: "Enquete F",
    positive: 16,
    negative: 10
  }
];

const ano_2018 = [
  {
    enquete: "Enquete A",
    positive: 30,
    negative: 40
  },
  {
    enquete: "Enquete B",
    positive: 10,
    negative: 20
  },
  {
    enquete: "Enquete C",
    positive: 10,
    negative: 5
  },
  {
    enquete: "Enquete D",
    positive: 5,
    negative: 45
  },
  {
    enquete: "Enquete E",
    positive: 10,
    negative: 10
  },
  {
    enquete: "Enquete F",
    positive: 16,
    negative: 32
  }
];

const ano_2019 = [
  {
    enquete: "Enquete A",
    positive: 20,
    negative: 20
  },
  {
    enquete: "Enquete B",
    positive: 30,
    negative: 40
  },
  {
    enquete: "Enquete C",
    positive: 13,
    negative: 2
  },
  {
    enquete: "Enquete D",
    positive: 50,
    negative: 15
  },
  {
    enquete: "Enquete E",
    positive: 12,
    negative: 25
  },
  {
    enquete: "Enquete F",
    positive: 30,
    negative: 30
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

class EnqueteTop5MostVoted extends React.PureComponent {
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
    const data = this.update_chart()

    return (
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Votos Positivos"
          valueField="positive"
          argumentField="enquete"
          color="#2F9728"
        />
        <BarSeries
          name="Votos Negaticos"
          valueField="negative"
          argumentField="enquete"
          color="#C70039"
        />
        <Animation />
        <Legend
          position="bottom"
          rootComponent={Root}
          labelComponent={Label}
        />

        <Title text={"Enquetes mais votadas " + this.props.ano} />
        <Stack />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    );
  }
}

export default EnqueteTop5MostVoted;
