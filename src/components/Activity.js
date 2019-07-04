import React from 'react';
import { Calendar } from "@nivo/calendar";
import { startOfDay } from 'date-fns'

import '../../styles/components/Activity.scss';


class Activity extends React.Component {
  constructor(){
    super();
  }

  render(){

    // const filteredObjectives = this.props.userProfileObjectivesObject.filter(object => object.complete == true )
    //
    // const reformattedObjectives = filteredObjectives.map(objective => (
    //
    // ))

    const data = [
      {
        day: "2015-03-06",
        value: 385
      },
      {
        day: "2016-03-06",
        value: 385
      },
      {
        day: "2016-06-28",
        value: 196
      },
      {
        day: "2016-07-22",
        value: 392
      },
      {
        day: "2017-07-22",
        value: 392
      }
    ];

    const margin = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 60
    };

    const today = startOfDay(new Date())
    console.log(today);

    return(
      <div className="activity">
        <div className="activity-chart">
          <h3>Last month activity</h3>

        <div className="activity-chart-2">
        <Calendar
          width={600}
          height={400}
          margin={margin}
          from="2016-01-01"
          to={today}
          data={data}
        />
      </div>
    </div>
    )
  }
}

export default Activity;
