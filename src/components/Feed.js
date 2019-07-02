import React from 'react';
import SortByUser from './SortByUser';
import { startOfDay, compareDesc, isToday } from 'date-fns'
import '../../styles/components/Feed.scss';


class Feed extends React.Component {
  constructor(){
    super();

    this.state = { allStatuses: [], groupedStatusesByDate: [] }

    this.allStatuses = this.allStatuses.bind(this)
    this.organizeStatuses = this.organizeStatuses.bind(this)
  }

  organizeStatuses(){
    // console.log('hit next');

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
    const groupedObjectsArray = Object.entries(groupByDate(this.state.allStatuses, 'completion_time'))

    // console.log('groupedObjectsArray - feed', groupedObjectsArray);

    groupedObjectsArray
    this.setState({
      groupedStatusesByDate: groupedObjectsArray
    })
  }

  allStatuses(){
    // console.log('hit');
    fetch(`/api/activities/objectives/complete`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        allStatuses: body
      }, () => this.organizeStatuses())

    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.allStatuses()
  }

  render(){

    return(
      <div className="feed">
        {this.state.groupedStatusesByDate.map(statuses => (
          <div key={statuses[0]}>
            { isToday(statuses[0]) ? (
              <h3>Today</h3>
            ) : (
              <h3>{statuses[0]}</h3>
            )}
            <SortByUser objectivesGroupedByDate={statuses[1]}/>
          </div>
        ))}
      </div>
    )
  }
}

export default Feed;
