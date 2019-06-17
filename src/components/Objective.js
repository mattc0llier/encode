import React from 'react';

class Objective extends React.Component {
  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event){
    this.props.receiveObjectiveStatus(this.props.objectiveObject)
  }

  render(){
      const objectivesObjectExists = !!this.props.objectiveObject;
    return(
      <div className="objective">
      {objectivesObjectExists ? (
        <div className="checkbox">
          <input type="checkbox" id="objective" name="objective" onClick={this.handleClick} />
          <label for="objective">✅ {this.props.objectiveObject.number} - {this.props.objectiveObject.objective}</label>
        </div>
      ) : null}
      </div>
    )
  }
}

export default Objective;
