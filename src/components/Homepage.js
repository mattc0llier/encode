import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/Homepage.scss';

class Homepage extends React.Component {
  constructor(){
    super();
  }

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
                <Link to='/users/new'>
                  <button type="button" name="button">Sign up to wait list</button>
                </Link>
                <p>33 students ready to play</p>
              </div>
            </div>
          </section>
          <section className="screenshot">
            <a href="https://encode.app/profile.html">
              <img id="screenshot" src="https://encode-app-public.s3-us-west-2.amazonaws.com/landing-page-assets/screenshot.svg" alt="Encode status updates" />
            </a>
          </section>
        </main>
      </div>
    )
  }
}

export default Homepage;
