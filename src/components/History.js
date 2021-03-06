import React from 'react';
import Status from './Status'
import Objective from './Objective'
import { startOfDay, compareDesc, parse, format, isYesterday, isToday } from 'date-fns'
import '../../styles/components/History.scss';



const History = ({ userProfileObjectivesObject, receiveObjectiveStatus }) => {
console.log('userProfileObjectivesObject 4', userProfileObjectivesObject);

  if (!userProfileObjectivesObject.length) {
    return <p>no activity</p>
  }

    // filter objects just for the completed objects
    const filteredObjects = userProfileObjectivesObject.filter(object => object.complete == true )

    //group completed objects by the date they were completed by
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

    //make those completed object dates into arrays to be mapped over.
    const groupedObjectsArray = Object.entries(groupByDate(filteredObjects, 'completion_time'))

    //still struggling to access the array dates and then sort by descending dates
    const sortedObjectives = groupedObjectsArray.sort(function(a, b){
      return compareDesc(a[0], b[0])
    })

    return(
      <div className="history">
          {sortedObjectives.map(statuses => (
            <div key={statuses[0]}>
            { isYesterday(statuses[0]) ? (
              <h3>Today</h3>
            ) : (
              <h3>{ format(statuses[0], 'dddd Do MMMM')}</h3>
            )}
              <Status statusArray={statuses[1]} completedObjectives={filteredObjects}/>
            </div>
          ))}
      </div>
    )
  }

export default History;
