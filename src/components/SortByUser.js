import React from 'react';
import Status from './Status'

class SortByUser extends React.Component {
  constructor(){
    super();
  }

  render(){

    function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, []);
  }

  var groupedPeople = groupBy(this.props.objectivesGroupedByDate, 'user_id');

  console.log('groupedPeople', groupedPeople)

    return(
      <React.Fragment>
        {groupedPeople.map(person => (
          <div key={person.objective_id}>
            <Status statusArray={person} />
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default SortByUser;
