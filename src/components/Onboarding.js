import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../styles/components/Nav.scss';


class Oboarding extends React.Component {
  constructor(){
    super();

    this.state = { display: "how"}

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
  }

  handleStartClick(){
    this.setState({
      display: "start"
    })
  }
  handleOnClick(){
    this.setState({
      display: "setup"
    })
  }

  render(){
    if (this.state.display == "start") return(
      <Redirect to='/start' />
    )
    else if (this.state.display == "setup") return(
      <div className="onboarding">
        <div className="how-encode-works">
          <div className="value-props">
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">1</div>
              </div>
              <div className="text">
                <h2>Install the chrome extension</h2>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">2</div>
              </div>
              <div className="text">
                <h2>Tell encode where you are currently up to with the Lambda school precourse</h2>
              </div>
            </div>
            <div className="button-cta">
                <button type="button" name="button" onClick={this.handleStartClick}>Start</button>
            </div>
          </div>
        </div>
      </div>
    )
    else return(
      <div className="onboarding">
        <div className="how-encode-works">
          <div className="value-props">
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">1</div>
              </div>
              <div className="text">
                <h2>You tell encode what course you're doing</h2>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">2</div>
              </div>
              <div className="text">
                <h2>Encode's browser extension logs when you complete a course and sends it to your profile</h2>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">3</div>
              </div>
              <div className="text">
                <h2>Your learning activity history can be reviewed and analysed</h2>
              </div>
            </div>
            <div className="button-cta">
                <button type="button" name="button" onClick={this.handleOnClick}>Set up encode</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Oboarding;
