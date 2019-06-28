import React from 'react';
import Status from 'react'
import { startOfDay, compareDesc } from 'date-fns'
import '../../styles/components/Feed.scss';


class Feed extends React.Component {
  constructor(){
    super();

    this.state = { allStatuses: [] }

    this.allStatuses = this.allStatuses.bind(this)
  }

  allStatuses(){
    fetch(`/api/activities/objectives/complete`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        allStatuses: body
      })
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.allStatuses()
  }

  render(){
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
    console.log('groupedObjectsArray', groupedObjectsArray);

    return(
      <div className="feed">
        <p>This a feed of all of the latest updates in your network</p>
        {groupedObjectsArray.map(status => (
          <div key={status[0]}>
            <p>{status[0]}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Feed;
