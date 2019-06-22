import React from 'react';
import '../../styles/components/Homepage.scss';

class Homepage extends React.Component {
  constructor(){
    super();

    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(event){
  //   console.log('login button');
  //   return fetch(`/api/login`, {
  //     method: 'POST',
  //     body: JSON.stringify({ username: "matt", password: "password" }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(body => {
  //     console.log(body);
  //   })
  // }

  render(){
    return(
      <div className="homepage">
        <main>
          <section className="hero">
            <h1>Get into Lambda School by playing</h1>
            <img id="encode-logo" src="https://encode-app-public.s3-us-west-2.amazonaws.com/landing-page-assets/logo-test.svg" alt="encode-logo" />
          </section>
          <section className="cta">
            <div className="value-props">
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">1</div>
                </div>
                <div className="text">
                  <h2>Smash the pre-course</h2>
                  <p>Boost your Mastery Score by working through the objectives and
                    sharing your pre-course progress</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">2</div>
                </div>
                <div className="text">
                  <h2>Learn with your peers</h2>
                  <p>Our dedicated community of learners and private study groups keep
                    each other accountable to finishing</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">3</div>
                </div>
                <div className="text">
                  <h2>Prove your progress to Lambda School</h2>
                  <p>We’re not going to fake hard work for you, but we can help you
                    prove the progress you have made</p>
                  <p>Log your learning activities with encode and build a historic summary of your efforts</p>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="price">
                <div className="win">
                  <h2>How to win:</h2>
                  <p>✅ Complete the precourse objectives</p>
                  <p>🔥 Keep up your activity streaks</p>
                  <p>🎓 Increase your Mastery Score - It's a secret 🤐</p>
                </div>
                <p>Show you are someone Lambda School can invest in.</p>
                <p>1 of the first 10 applicants to get accepted into Lambda using encode will <b>win $100!</b></p>
              </div>
              <div className="button-cta">
                <a href="#signup" id="button">
                  <button type="button" name="button">Join the wait list</button>
                </a>
                <p>33 students ready to play</p>
              </div>
            </div>
          </section>
          <section className="screenshot">
            <a href="https://encode.app/profile.html">
              <img id="screenshot" src="https://encode-app-public.s3-us-west-2.amazonaws.com/landing-page-assets/screenshot.svg" alt="Encode status updates" />
            </a>
          </section>
              <section className="signup" id="signup">
                <p>Leave your email and we'll let you know when we're ready to go.</p>
                <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=586033553927.659635767442"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
              </section>
        </main>
      </div>
    )
  }
}

export default Homepage;
