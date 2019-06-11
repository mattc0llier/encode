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
        <div className="checkbox">
          <input type="checkbox" id="scales" name="scales" />
          <label for="scales">{this.props.objectiveObject.number} - {this.props.objectiveObject.objective}</label>
        </div>
      ) : null}
      </div>
    )
  }
}

export default Objective;
