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

const ano_2017 = [
    {
        month: "Janeiro",
        questions: 20,
        votes: 25
    },
    {
        month: "Fevereiro",
        questions: 30,
        votes: 17
    },
    {
        month: "Março",
        questions: 13,
        votes: 17
    },
    {
        month: "Abril",
        questions: 7,
        votes: 11
    },
    {
        month: "Maio",
        questions: 7,
        votes: 27
    },
    {
        month: "Junho",
        questions: 16,
        votes: 10
    },
    {
        month: "Julho",
        questions: 30,
        votes: 90
    },
    {
        month: "Agosto",
        questions: 160,
        votes: 170
    },
    {
        month: "Setembro",
        questions: 106,
        votes: 102
    },
    {
        month: "Outubro",
        questions: 50,
        votes: 80
    },
    {
        month: "Novembro",
        questions: 15,
        votes: 200
    },
    {
        month: "Dezembro",
        questions: 74,
        votes: 100
    }
];


const ano_2018 = [
    {
        month: "Janeiro",
        questions: 40,
        votes: 50
    },
    {
        month: "Fevereiro",
        questions: 30,
        votes: 20
    },
    {
        month: "Março",
        questions: 30,
        votes: 30
    },
    {
        month: "Abril",
        questions: 10,
        votes: 50
    },
    {
        month: "Maio",
        questions: 30,
        votes: 12
    },
    {
        month: "Junho",
        questions: 20,
        votes: 30
    },
    {
        month: "Julho",
        questions: 10,
        votes: 50
    },
    {
        month: "Agosto",
        questions: 100,
        votes: 50
    },
    {
        month: "Setembro",
        questions: 40,
        votes: 10
    },
    {
        month: "Outubro",
        questions: 10,
        votes: 30
    },
    {
        month: "Novembro",
        questions: 65,
        votes: 20
    },
    {
        month: "Dezembro",
        questions: 50,
        votes: 23
    }
];

const ano_2019 = [
    {
        month: "Janeiro",
        questions: 30,
        votes: 40
    },
    {
        month: "Fevereiro",
        questions: 20,
        votes: 60
    },
    {
        month: "Março",
        questions: 53,
        votes: 67
    },
    {
        month: "Abril",
        questions: 27,
        votes: 45
    },
    {
        month: "Maio",
        questions: 37,
        votes: 57
    },
    {
        month: "Junho",
        questions: 76,
        votes: 30
    },
    {
        month: "Julho",
        questions: 50,
        votes: 80
    },
    {
        month: "Agosto",
        questions: 30,
        votes: 150
    },
    {
        month: "Setembro",
        questions: 54,
        votes: 32
    },
    {
        month: "Outubro",
        questions: 57,
        votes: 20
    },
    {
        month: "Novembro",
        questions: 40,
        votes: 30
    },
    {
        month: "Dezembro",
        questions: 24,
        votes: 50
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

class EnquetesYearVotesAndSuggestion extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ano: 2019,
        }
    }

    update_chart() {
        let ano_data = []
        if (this.props.ano === "2017") {
            ano_data = ano_2017
        } else if (this.props.ano === "2018") {
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
                    name="Sugestões"
                    valueField="questions"
                    argumentField="month"
                    color="#3498DB"
                />
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

                <Title text={"Enquetes " + this.props.ano} />
                <Stack />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        );
    }
}

export default EnquetesYearVotesAndSuggestion;