import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../../styles/components/Onboarding.scss';


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
          <h2>Get started in less than a minute</h2>
          <div className="value-props">
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">1</div>
              </div>
              <div className="text">
                <h2>Set up an account</h2>
                <p>jfe</p>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">2</div>
              </div>
              <div className="text">
                <h2>Install the chrome extension</h2>
                <p>Find it in the Chrome store <a href="https://chrome.google.com/webstore/category/extensions">here</a></p>
                <p>And log in to your encode account</p>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">2</div>
              </div>
              <div className="text">
                <h2>Tell us where you're up too</h2>
                <p>If you have started the course already - tell encode where you are currently up to with the Lambda school precourse and we'll catch up your profile.</p>
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
                <h2>Learn as you normally would</h2>
                <p>The overlay provides valuable instant feedback on your personal learning activities.</p>
                <p>The learning log let's you share your progress, view your history and analyse your educational activities day by day to see your progress.</p>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">2</div>
              </div>
              <div className="text">
                <h2>encode is made up of an informative overlay and personal learning log</h2>
                <div className="screenshots">
                  <img src="../../static/assets/images/notifications.gif" alt="overlay and log screenshot" />
                </div>
                <p>The overlay provides valuable instant feedback on your personal learning activities.</p>
                <p>The learning log let's you share your progress, view your history and analyse your educational activities day by day to see your progress.</p>
              </div>
            </div>
            <div className="value-prop">
              <div className="number">
                <div className="numberCircle">3</div>
              </div>
              <div className="text">
                <h2>encode's Mastery Score™ gives you instant feedback on the effectness of your learning strategy</h2>
                <p>Mastery Score™ analyses and ranks your educational activities by how effective they are at enabling you to master your understanding of a concept and topic.</p>
                <p>Encode uses several industry-leading concepts from neuroscience and pedagogy to detirmine. It will constantly update to get better over time.</p>
                <p>Find out more about your how your Mastery Score™ is calculated here.</p>
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
