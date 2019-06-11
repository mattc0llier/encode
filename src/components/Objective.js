import React from 'react';

class Objective extends React.Component {
  constructor(){
    super();
  }

  render(){
      console.log('objective object', this.props.objectiveObject)
      const objectivesObjectExists = !!this.props.objectiveObject;
    return(
      <div className="objective">
      <p>hello</p>
      {objectivesObjectExists ? (
        <p>{this.props.objectiveObject.number} - {this.props.objectiveObject.objective}</p>
      ) : null}
      </div>
    )
  }
}

export default Objective;
