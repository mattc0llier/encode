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
    console.log(groupedObjectsArray)

    const dailySummary = groupedObjectsArray.map(objectiveGroup => {
      const dailyMasteryScore = objectiveGroup[1].reduce(function(acc, cur) {
        return acc + cur.mastery_score
      }, 0);
      console.log('dailyMasteryScore', dailyMasteryScore);
      return {
        day: objectiveGroup[0], value: dailyMasteryScore
      }
    })

    console.log('dailySummary', dailySummary)

    return dailySummary
  }

  render(){

    const filteredObjectives = this.props.userProfileObjectivesObject.filter(object => object.complete == true )
    console.log('filteredObjectives', filteredObjectives)

    const dailySummary = this.organizeDays(filteredObjectives)
    //
    //
    // const dailySummary = dailySummary.map(objective => (
    //   {
    //     day: startOfDay(objective.completion_time).toISOString().split('T')[0],
    //     value: objective.mastery_score
    //   }
    // ))
    // console.log('reformattedObjectives', reformattedObjectives);

    const margin = {
      top: 0,
      right: 20,
      bottom: 0,
      left: 0
    };

    const today = startOfDay(new Date())
    console.log(today);
    const firstDay = "2019-07-01"

    return(
      <div className="activity">
        <div className="activity-chart">
          <h3>Daily activity</h3>
        <div className="activity-chart-2">
        <Calendar
          width={400}
          height={100}
          margin={margin}
          from={firstDay}
          to={today}
          emptyColor="#eeeeee"
          data={dailySummary}
          colors={[ '#3424AC', '#FF5352' ]}
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
