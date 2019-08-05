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
        <React.Fragment>
        <div className="checkbox">
          { this.props.currentUserProfile ? (
            <React.Fragment>
              <input value="1" type="checkbox" id="objective" name="objective" />
              <label onClick={this.handleClick} id="checklabel" for="mycheck" style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}></label>
            </React.Fragment>
          ) : (
            <span style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}><img src="/static/assets/images/workingOn.svg" /></span>
          )}

          <span style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img src="/static/assets/images/doubleChecks.svg" /></span>
          <p for="objective">{this.props.objectiveObject.objective} ({this.props.objectiveObject.number})</p>
        </div>
        </React.Fragment>

      ) : null}
      </div>
    )
  }
}

export default Objective;
