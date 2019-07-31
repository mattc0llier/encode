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
            <h1>encode</h1>
            <h3>Your personal learning log</h3>
          </section>
          <section className="cta">
            <div className="value-props">
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">1</div>
                </div>
                <div className="text">
                  <h2>Log your educational progress all in one place</h2>
                  <p>Boost your Mastery Score™ by working through the course objectives and automatically logging your learning resources</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">2</div>
                </div>
                <div className="text">
                  <h2>Get instant feedback on your learning</h2>
                  <p>encode analyses your logged activities and gives you instant feedback on your progress and graphs your efforts</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">3</div>
                </div>
                <div className="text">
                  <h2>Prove your effort to Lambda School</h2>
                  <p>We’re not going to fake hard work for you, but we can help you prove the progress you have made by publically summarising your activity</p>
                  <p>What you share is up to you</p>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="price">
                <p>Your learning profile is private by default. Feel free to make mistakes, it’s how we progress.</p>
                <div className="how">
                  <p>✅ Complete the precourse objectives</p>
                  <p>🔥 Keep up your activity streaks</p>
                  <p>🎓 Increase your <b>Mastery Score™</b></p>
                </div>
              </div>
              <div className="button-cta">
                <Link to='/users/new'>
                  <button type="button" name="button">Sign up to wait list</button>
                </Link>
                <p>67 students in queue</p>
              </div>
            </div>
          </section>
          <section>
            <div className="current-schools">
              <div className="school-logo">
              </div>
            </div>
            <div class="coming-soon">
              <div className="school-logo">
              </div>
              <div className="school-logo">
              </div>
              <div className="school-logo">
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
