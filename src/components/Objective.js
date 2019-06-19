import React from 'react';
import '../../styles/components/Objective.scss';


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
          <input value="1" type="checkbox" id="objective" name="objective" />
          <label onClick={this.handleClick} id="checklabel" for="mycheck" style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}></label>

          <span style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img src="/static/assets/images/doubleChecks.svg" /></span>
          <p for="objective">{this.props.objectiveObject.objective} ({this.props.objectiveObject.number})</p>
        </div>
      ) : null}
      </div>
    )
  }
}

export default Objective;
