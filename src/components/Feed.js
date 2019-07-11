import React from 'react';
import SortByUser from './SortByUser';
import { startOfDay, compareDesc, isToday, parse, format, isYesterday } from 'date-fns'
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
    //still struggling to access the array dates and then sort by descending dates
    const sortedObjectives = groupedObjectsArray.sort(function(a, b){
      return compareDesc(a[0], b[0])
      // console.log('a[0]', a[0]);
    })

    this.setState({
      groupedStatusesByDate: sortedObjectives
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
      <div className="feed-left">
        <div className="feed-content">
          <div className="feed-summary-header">
            <h4>Community progress</h4>
          </div>
          <div className="feed-kpi">
            <div className="this-week">
              <p>This Week: </p>
              <p>Accepted to Lambda school: 0 </p>
              <p>Total mastery points earnt: 1345</p>
            </div>
            <div className="last-week">
              <p>Last Week: </p>
              <p>Accepted to Lambda school: 0 </p>
              <p>Total mastery points earnt: 2000</p>
            </div>
          </div>
        </div>

        {this.state.groupedStatusesByDate.map(statuses => (
          <div key={statuses[0]}>
            { isYesterday(statuses[0]) ? (
              <h3>Today</h3>
            ) : (
              <h3>{ format(statuses[0], 'dddd Do MMMM')}</h3>
            )}
            <SortByUser objectivesGroupedByDate={statuses[1]}/>
          </div>
        ))}
      </div>

      </div>
    )
  }
}

export default Feed;
