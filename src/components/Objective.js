import React from 'react';

class Objective extends React.Component {
  constructor(){
    super();
  }

  render(){
      const objectivesObjectExists = !!this.props.objectiveObject;
    return(
      <div className="objective">
      {objectivesObjectExists ? (
        <p>{this.props.objectiveObject.number} - {this.props.objectiveObject.objective}</p>
      ) : null}
      </div>
    )
  }
}

export default Objective;
