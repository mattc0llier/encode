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
              <span style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}><img className="favicon" src="/static/assets/images/lambda-logo-favicon.svg" /></span>
            </React.Fragment>
          ) : (
            <span style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}><img src="/static/assets/images/workingOn.svg" /></span>
          )}

          <span style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img className="favicon" src="/static/assets/images/lambda-logo-favicon.svg" /></span>
          <p for="objective">{this.props.objectiveObject.objective} ({this.props.objectiveObject.number})</p>
          <span className="doubleChecks" style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img src="/static/assets/images/doubleChecks.svg" /></span>
        </div>
        </React.Fragment>

      ) : null}
      </div>
    )
  }
}

export default Objective;
