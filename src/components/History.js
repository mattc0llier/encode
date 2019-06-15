import React from 'react';
import Status from './Status'
import Objective from './Objective'
const startOfDay = require('date-fns/start_of_day')


class History extends React.Component {
  constructor(){
    super();
  }

  render(){
    const filteredObjects = this.props.currentUserObjectivesObject.filter(object => object.complete == true )
    // const sortedObjectives = filteredObjects.sort(function(a, b) {
    //   return a.completion_time - b.completion_time;
    // });

    function groupByDate(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        var key = startOfDay(obj[property]).toISOString().split('T')[0];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    const groupedObjectsArray = Object.entries(groupByDate(filteredObjects, 'completion_time'))

    console.log('groupedObjectsArray',  groupedObjectsArray);

    return(
      <div className="history">
        <h3>History</h3>
          {groupedObjectsArray.map(dailyObjectives => {
            <div key={dailyObjectives[0]}>
              <p>hello</p>
            </div>
          })}
      </div>
    )
  }
}

export default History;
