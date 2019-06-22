import React from 'react';
import Status from './Status'
import Objective from './Objective'
import { startOfDay, compareDesc } from 'date-fns'
import '../../styles/components/History.scss';



class History extends React.Component {
  constructor(){
    super();
  }

  render(){
    // filter objects just for the completed objects
    const filteredObjects = this.props.userProfileObjectivesObject.filter(object => object.complete == true )

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
    const sortedObjectives = groupedObjectsArray.sort(function(a){
      compareDesc(a[0])
      console.log('a[0]', a[0]);
    })


    console.log('groupedObjectsArray',  groupedObjectsArray);
    console.log('sortedObjectives',  sortedObjectives);

    return(
      <div className="history">
        <h3>History</h3>
          {groupedObjectsArray.map(status => (
            <div key={status[0]}>
              <Status userProfileObject={this.props.userProfileObject} statusArray={status}/>
            </div>
          ))}
      </div>
    )
  }
}

export default History;
