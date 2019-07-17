import React from 'react';
import '../../styles/_animation.scss';

class CelebrationAnimation extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className="celebration-animation">
        <div className={this.props.celebration}>
          <div className="achievement-super">
            <div className="achievement-body">
              <p className="achievement-text">Lambda school</p>
              <p className="achievement-subtext">Completed Lesson 5</p>
            </div>
            <div className="achievement-title">
              <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
              >
                <path
                  fill="#fff"
                  d="M479.863,103.342c-0.051-2.833-0.096-5.279-0.096-7.342h-80.835c1.56-34.617,0.512-64,0.512-64s-95.591,0-142.568,0
                  c-0.337,0-0.669,0.022-1,0.056c-0.33-0.034-0.662-0.056-1-0.056c-46.977,0-142.931,0-142.931,0s-1.048,29.383,0.512,64H32.232H32
                  v20.548c0,0.114,0,0.228,0,0.342V128h0.161c0.811,26.096,4.98,60.999,22.333,96.729c14.718,30.307,35.912,55.664,62.996,75.367
                  c22.422,16.312,48.041,28.064,76.205,35.084C209.96,352.539,226,362.109,240,365.957v35.625C238,412.165,225.86,448,141.234,448H128
                  v32h256v-32h-13.178C271.538,448,272,398.666,272,398.666v-32.714c14-3.843,29.73-13.374,45.91-30.644
                  c28.369-7.004,54.072-18.801,76.633-35.213c27.082-19.703,48.262-45.06,62.98-75.367
                  C481.203,175.967,480.326,128.723,479.863,103.342z M83.262,210.745C68.802,180.966,65.018,150.996,64.187,128h50.487
                  c0.868,8.914,1.966,17.701,3.356,25.98c8.513,50.709,20.213,95.493,42.354,135.009C126.546,271.848,99.97,245.149,83.262,210.745z
                   M428.737,210.745c-16.807,34.61-43.603,61.421-77.729,78.55c22.215-39.591,33.816-84.475,42.352-135.314
                  c1.39-8.28,2.488-17.067,3.356-25.98h51.096C446.981,150.996,443.198,180.966,428.737,210.745z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      )
    }
}

export default CelebrationAnimation;
