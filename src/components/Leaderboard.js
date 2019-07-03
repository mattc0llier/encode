import React from 'react';
import { summary } from 'date-streaks';
import '../../styles/components/Leaderboard.scss';

class Leaderboard extends React.Component {
  constructor(){
    super();
  }

  render(){

    const datees = [
  new Date('01/01/2018'),
  new Date('01/02/2018'),
  new Date('01/04/2018')
];

const dates = [

  '2018-10-29T10:40:33.000Z',
  '2018-10-29T10:40:34.000Z',
  '2018-10-30T10:40:37.000Z',
  '2019-07-02T21:46:45.000Z',
  '2019-07-02T21:46:50.000Z',
  '2019-07-02T21:50:29.000Z',
  '2019-07-02T22:53:07.000Z',
  '2019-07-03T09:57:30.000Z',
  '2019-07-03T09:57:35.000Z',
  '2019-07-03T11:48:01.000Z',
  '2019-07-03T11:48:02.000Z',
  '2019-06-29T10:37:33.735Z',
  '2019-07-01T10:37:34.735Z',
  '2019-07-02T10:37:34.735Z',
  '2019-07-03T10:37:35.735Z'
]


    const streak = summary({ dates })

    console.log(streak);

    return(
      <div className="leaderboard">

        <h1>Leaderboard</h1>
        <h1>{streak.currentStreak}</h1>

      </div>
    )
  }
}

export default Leaderboard;
