var styleEl = document.createElement('style');
styleEl.innerHTML = `.notifications {
      z-index: 1000000000000;
      font-family: 'Roboto', sans-serif;
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      margin-right: 1rem;
    }
    .main-notfiication {
      display: flex;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      width: 30rem;
      height: 7rem;
      background-color: #5214FF;
      color: #ffffff;
    }
    .topic-notifications {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
    }
    .topic-notfication {
      display: flex;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      background-color: #FF6363;
      color: #ffffff;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      padding: 0.8rem;
      margin: 0.7rem 0 0.7rem 0.7rem;
    }
      .mastery_score-wut {
        padding: 1rem;
        color: #ffffff;
      }
      .info-test-diff {
        padding: 0.5rem 1rem;
      }
      .title {

      }
      .blooms-categories-wut {
        text-align: center;
      }
      .progress-iewfni {
        padding: 1rem;
      }

    .media-content {
      display: flex;
      justify-content: flex-end;
    }

    .media-content img {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      max-width: 20rem;
    }

    #slide {
        right: -40rem;
        width: 30rem;
        height: 30rem;
        -webkit-animation: slide 0.5s forwards;
        animation: slide 0.5s forwards;

    }

    @-webkit-keyframes slide {
        100% { right: 0; }
    }

    @keyframes slide {
        100% { right: 0; }
    }
`;
document.head.appendChild(styleEl);

const animation = document.createElement("div");
animation.setAttribute('class', 'overlay');
animation.innerHTML = `
<div class="overlay">
    <div class="notifications" id="slide">
      <div class="main-notfiication">
        <div class="mastery_score-wut">
          <h1>+3</h1>
        </div>
        <div class="info-test-diff">
          <div class="title-test-hello">
            <p>
              Learn about the Box Model and be able to
            </p>
          </div>
          <div class="blooms-categories-wut">
            <p>
              apply - implement - test
            </p>
          </div>
        </div>
        <div class="progress-iewfni">
          <span>13/44</span>
        </div>
      </div>
      <div class="topic-notifications">
        <p class="topic-notfication" >Software engineering</p>
        <p class="topic-notfication" >Job roles</p>
        <p class="topic-notfication" >Javascript</p>
      </div>
      <div class="media-content">
        <img src="https://media0.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif" alt="gif">
      </div>
    </div>
  </div>
`
document.body.appendChild(animation);
