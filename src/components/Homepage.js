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
            <img src="../../static/assets/images/encode-yourself.svg" alt="encode yourself" id="hero-img"/>
            <h1>encode</h1>
            <h3>Your personal learning logbook</h3>
          </section>
          <section className="cta">
            <div className="value-props">
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">1</div>
                </div>
                <div className="text">
                  <h2>Log your educational progress</h2>
                  <p>Boost your Mastery Score™ by working through the course objectives and automatically logging the learning resources you find along the way</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">2</div>
                </div>
                <div className="text">
                  <h2>Get instant feedback on your learning</h2>
                  <p>encode analyses your activity to give you feedback on your progress and graphs your efforts</p>
                </div>
              </div>
              <div className="value-prop">
                <div className="number">
                  <div className="numberCircle">3</div>
                </div>
                <div className="text">
                  <h2>Prove your personal growth to Lambda School</h2>
                  <p>We’re not going to fake hard work for you, but we can help you prove the progress you have made by publically summarising your activity</p>
                  <p>What you share is up to you</p>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="price">
                <p>Your learning profile is private by default. Feel free to make mistakes, it’s how we grow.</p>
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
          <section className="schools">
            <div className="current-schools">
              <p>Currently supports</p>
              <div className="school-logo">
                <img src="../../static/assets/images/lambda-logo.svg" />
              </div>
            </div>
            <div class="coming-soon">
              <p>Coming soon</p>
              <div className="school-logo">
                <img src="../../static/assets/images/khan-academy-logo.svg" />
              </div>
              <div className="school-logo">
                <img src="../../static/assets/images/superhi-logo.svg" />
              </div>
              <div className="school-logo">
                <img src="../../static/assets/images/udemy-logo.svg" />
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
