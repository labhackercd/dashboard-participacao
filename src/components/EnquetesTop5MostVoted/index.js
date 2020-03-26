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

const data = [
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
      data
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Chart data={chartData}>
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

        <Title text="Enquetes mais votadas 2019" />
        <Stack />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    );
  }
}

export default EnqueteTop5MostVoted;
