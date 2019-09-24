import React from 'react';
import Tags from './Tags';
import '../../styles/components/Objective.scss';


class Objective extends React.Component {
  constructor(){
    super();

    this.state = { showTags: false, objectiveTags:[]}

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.fetchObjectiveTags = this.fetchObjectiveTags.bind(this);
  }

  fetchObjectiveTags(){
      fetch(`/api/objective/${this.props.objectiveObject.objective_id}/tags`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log('objectiveTags body', body)
          this.setState({
            objectiveTags: body
          }, () => console.log('objectiveTags state', this.state.objectiveTags))
      })
      .catch(error => console.log(error.message))
  }


  handleToggleClick(event){
    if(this.state.showTags){
      this.setState({
        showTags:false
      })
    } else {
      this.setState({
        showTags:true
      })
    }
  }

  componentDidMount(){
    this.fetchObjectiveTags()
  }

  render(){
      const objectivesObjectExists = !!this.props.objectiveObject;
    return(
      <div className="objective">
      {objectivesObjectExists ? (
        <React.Fragment>
        <div className="checkbox" onClick={this.handleToggleClick}>
          { this.props.currentUserProfile ? (
            <React.Fragment>
              <span style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}><img className="favicon" src="/static/assets/images/lambda-logo-favicon.svg" /></span>
            </React.Fragment>
          ) : (
            <span style={{display: this.props.objectiveObject.complete ? 'none' : 'block' }}><img src="/static/assets/images/workingOn.svg" /></span>
          )}

          <span style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img className="favicon" src="/static/assets/images/lambda-logo-favicon.svg" /></span>
          <a href={this.props.objectiveObject.url} ><p for="objective">{this.props.objectiveObject.objective} ({this.props.objectiveObject.number})</p></a>
          <span className="doubleChecks" style={{display: this.props.objectiveObject.complete ? 'block' : 'none' }}><img src="/static/assets/images/doubleChecks.svg" /></span>
        </div>
        <div style={{display: this.state.showTags ? 'block' : 'none' }}>
          <Tags statusTags={this.state.objectiveTags}/>
        </div>
        </React.Fragment>

      ) : null}
      </div>
    )
  }
}

export default Objective;
