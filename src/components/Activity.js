import React from 'react';
import { Calendar } from "@nivo/calendar";
import { startOfDay } from 'date-fns'

import '../../styles/components/Activity.scss';


class Activity extends React.Component {
  constructor(){
    super();

    this.organizeDays = this.organizeDays.bind()
  }

  organizeDays(filteredObjectives){
  //
    //group completed objects by the date they were completed by
    function groupByDate(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        var key = startOfDay(obj[property]).toISOString().split('T')[0]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj);
        return acc
      }, {})
    }

    //make those completed object dates into arrays to be mapped over.
    const groupedObjectsArray = Object.entries(groupByDate(filteredObjectives, 'completion_time'))

    const dailySummary = groupedObjectsArray.map(objectiveGroup => {
      const dailyMasteryScore = objectiveGroup[1].reduce(function(acc, cur) {
        return acc + cur.mastery_score
      }, 0);
      return {
        day: objectiveGroup[0], value: dailyMasteryScore
      }
    })

    return dailySummary
  }

  render(){

    const filteredObjectives = this.props.userProfileObjectivesObject.filter(object => object.complete == true )

    const dailySummary = this.organizeDays(filteredObjectives)

    const margin = {
      top: 0,
      right: 20,
      bottom: 0,
      left: 0
    };

    const today = startOfDay(new Date())
    const firstDay = "2019-07-01"

    return(
      <div className="activity">
        <div className="activity-chart">
        <div className="activity-chart-2">
        <Calendar
          width={900}
          height={200}
          margin={margin}
          from={firstDay}
          to={today}
          emptyColor="#eeeeee"
          data={dailySummary}
          colors={[ '#3424AC','#673096','#9A3C7F','#CC4769','#FF5352' ]}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
        />
        </div>
      </div>
    </div>
    )
  }
}

export default Activity;
