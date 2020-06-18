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
    votes: 25000
  },
  {
    month: "Fevereiro",
    votes: 17000
  },
  {
    month: "Março",
    votes: 22000
  },
  {
    month: "Abril",
    votes: 11000
  },
  {
    month: "Maio",
    votes: 27000
  },
  {
    month: "Junho",
    votes: 10000
  },
  {
    month: "Julho",
    votes: 90000
  },
  {
    month: "Agosto",
    votes: 170000
  },
  {
    month: "Setembro",
    votes: 102000
  },
  {
    month: "Outubro",
    votes: 80000
  },
  {
    month: "Novembro",
    votes: 200000
  },
  {
    month: "Dezembro",
    votes: 100000
  }
];

const ano_2018 = [
  {
    month: "Janeiro",
    votes: 50000
  },
  {
    month: "Fevereiro",
    votes: 20000
  },
  {
    month: "Março",
    votes: 30000
  },
  {
    month: "Abril",
    votes: 50000
  },
  {
    month: "Maio",
    votes: 12000
  },
  {
    month: "Junho",
    votes: 34000
  },
  {
    month: "Julho",
    votes: 50000
  },
  {
    month: "Agosto",
    votes: 74000
  },
  {
    month: "Setembro",
    votes: 22000
  },
  {
    month: "Outubro",
    votes: 32000
  },
  {
    month: "Novembro",
    votes: 29000
  },
  {
    month: "Dezembro",
    votes: 45000
  }
];

const ano_2019 = [
  {
    month: "Janeiro",
    votes: 40000
  },
  {
    month: "Fevereiro",
    votes: 60000
  },
  {
    month: "Março",
    votes: 67000
  },
  {
    month: "Abril",
    votes: 45000
  },
  {
    month: "Maio",
    votes: 57000
  },
  {
    month: "Junho",
    votes: 33000
  },
  {
    month: "Julho",
    votes: 80000
  },
  {
    month: "Agosto",
    votes: 150000
  },
  {
    month: "Setembro",
    votes: 32000
  },
  {
    month: "Outubro",
    votes: 20000
  },
  {
    month: "Novembro",
    votes: 30000
  },
  {
    month: "Dezembro",
    votes: 50000
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
const Root = withStyles(legendStyles, {
  name: "LegendRoot"
})(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap"
  }
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, {
  name: "LegendLabel"
})(legendLabelBase);

class EnquetesYearVotes extends React.Component {
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
            filename={"votos-enquetes_" + this.state.ano + ".csv"}
            className="btn btn-primary"
          >
            Exportar csv
          </CSVLink>
        </Box>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            name="Votos"
            valueField="votes"
            argumentField="month"
            color="#FFC300"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text={"Enquetes " + this.props.ano} /> <Stack />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Box>
    );
  }
}

export default EnquetesYearVotes;
