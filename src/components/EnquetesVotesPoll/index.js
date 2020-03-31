import * as React from 'react';
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation, EventTracker } from '@devexpress/dx-react-chart';

const enquete_A = [
  { vote: 'Positivo', count: 30 },
  { vote: 'Negativo', count: 10 },
];

const enquete_B = [
  { vote: 'Positivo', count: 50 },
  { vote: 'Negativo', count: 20 },
];

const enquete_C = [
  { vote: 'Positivo', count: 10 },
  { vote: 'Negativo', count: 40 },
];

class EnquetesVotesPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: enquete_A
    };
  }

  update_chart() {
    let enquete = []
    if (this.props.enquete === "C") {
      enquete = enquete_C
    } else if (this.props.enquete === "B") {
      enquete = enquete_B
    } else {
      enquete = enquete_A
    }

    return enquete
  }

  render() {
    const data = this.update_chart()
    return (

      <Chart
        data={data}
      >
        <PieSeries
          valueField="count"
          argumentField="vote"
        />
        <Legend />
        <Title
          text={"Votos da Enquete " + this.props.enquete}
        />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    );
  }


}

export default EnquetesVotesPoll;