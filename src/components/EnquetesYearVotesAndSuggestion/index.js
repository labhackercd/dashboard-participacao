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

                <Title text="Enquetes 2019" />
                <Stack />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        );
    }
}

export default EnquetesYearVotesAndSuggestion;