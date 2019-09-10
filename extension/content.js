console.log("content script is running");

var port = chrome.runtime.connect({name: "url_activities"});
port.postMessage({content_loaded: true});
port.onMessage.addListener(function(response) {
  console.log('response', response);
  console.log('activities', response.activity[0]);
  console.log('activity', response.activity[0][0]);
  console.log('topics', response.activity[1]);
  const activity = response.activity[0][0]
  const topics = response.activity[1]
  if(activity.complete == false) {

    console.log('topics.length', topics.length);
    let notifications = ''
    if (topics.length >= 0) {
      console.log('topics.length hit');

       notifications = `${topics.map(topic => `<span class="topic-notification">${topic.topic}</span>`).join('')}`;
      console.log('notifications', notifications);
    }

    // const createTitle = function(title, url) {
    //   return `<a href="${url}"><h2>${title}</h2></a>`;
    // };
    // const createTopics = function(topics) {
    //   return topics.map(topic => (
    //     `<p class="topic-notfication" >${topic.topic}</p>`
    //   ))
    // }
    //
    // createTopics()
    //
    // console.log('createTopics', createTopics);

    //Verbs needed for blooms taxonomy
    //should be random array with one primary verb.

    // const remember = ["remember", "define", "duplicate", "list", "memorize", "repeat", "state",]
    // const understand = ["understand", "classify", "describe", "discuss", "explain", "identify", "locate", "recognize", "report", "select", "translate"]
    // const apply = ["apply", "execute", "implement", "solve", "use", "demonstrate", "interpret", "operate", "schedule", "sketch"]
    // const analyze = ["analyze", "differentiate", "organize", "relate", "compare", "contrast", "distinguish", "examine", "experiment", "question", "test"]
    // const evaluate = ["evaluate", "appraise", "argue", "judge", "defend", "select", "support", "value", "critique", "weigh"]
    // const create = ["create", "design", "assemble", "construct", "conjecture", "develop", "formulate", "author", "investigate"]
    //
    //
    // const bloomsMethods = {
    //   1: remember,
    //   2: understand,
    //   3: apply,
    //   4: analyze,
    //   5: evaluate,
    //   6: create
    // }
    // function getBlooms(mastery_score){
    //   console.log(mastery_score);
    //   const primaryVerb = bloomsMethods[mastery_score][0]
    //   console.log('primaryVerb', primaryVerb);
    //   const index1 = Math.floor(Math.random() * 6);
    //   const index2 = Math.floor(Math.random() * 6);
    //   const secondaryVerb = bloomsMethods[mastery_score][index1]
    //   console.log('secondaryVerb', secondaryVerb);
    //   const thirdVerb = bloomsMethods[mastery_score][index2]
    //   console.log('thirdVerb', thirdVerb);
    //
    //   return [primaryVerb, secondaryVerb, thirdVerb]
    // }
    //
    // const bloomsCategories = getBlooms(activity.mastery_score)
    //
    // console.log('bloomsCategories', bloomsCategories);

  // const COLORS = [
  //   "https://media1.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  //   "https://media2.giphy.com/media/slOhiKAVFgwr6/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  //   "https://media0.giphy.com/media/fdyZ3qI0GVZC0/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif"
  // ];
  //
  // function getGif() {
  //   const index = Math.floor(Math.random() * 6);
  //
  //   return COLORS[index];
  // }
  //
  // const randomGif = getGif();


  // adding document event listeners

  document.body.addEventListener('mouseover', event => {
    if(event.target.matches('.prev-link, .next-link, .learndash_mark_complete_button, .gform_button button')){
      console.log(event.target.className)
      console.log('run animation');

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
            background-color: #5214FF;
            color: #ffffff;
          }
          .topic-notifications {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .topic-notification {
            display: flex;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
            background-color: #FF6363;
            color: #ffffff;
            font-style: normal;
            font-weight: 500;
            font-size: 1rem;
            line-height: 10px;
            padding: 0.6rem;
            margin: 0.7rem 0.7rem 0 0;
          }
          .lhs-information{
            display: flex;
            justify-content: flex-start;
          }
            .mastery_score-wut {
              padding: 1rem;
              color: #ffffff;
              display: flex;
              align-items: center;
            }
            .mastery_score-wut h1 {
              color: #ffffff;
              font-weight: 600;
            }
            .info-test-diff {
              padding: 0.5rem 1rem;
              display: flex;
              align-items: center;
            }
            .info-test-diff p {
              margin-bottom: 0;
            }
            .title-test-hello {
              font-weight: 700;
            }
            .blooms-categories-wut {
              text-align: center;
            }
            .progress-iewfni {
              padding: 1rem;
              display: flex;
              align-items: center;
            }
            .progress-iewfni span {
              font-size: 2rem;
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

      //should be mapping over the topics depending how many there are
      const animation = document.createElement("div");
      animation.setAttribute('class', 'overlay-427542754');
      animation.innerHTML = `
          <div class="notifications" id="slide">
            <div class="main-notfiication">
            <div class="lhs-information" >
                <div class="mastery_score-wut">
                  <h1>+${activity.mastery_score}</h1>
                </div>
                <div class="info-test-diff">
                  <div class="title-test-hello">
                    <p>
                      ${activity.objective}
                    </p>
                  </div>

                </div>
              </div>
              <div class="progress-iewfni">
                <span>${activity.number}/44</span>
              </div>
            </div>
            <div class="topic-notifications">
              ${notifications}
            </div>
            </div>
          </div>

      `
      debugger;

      document.body.appendChild(animation);
      debugger;
    }
    debugger;
  });


  document.body.addEventListener('mousedown', event => {
    console.log('mouse down hit');
    if(event.target.matches('.next-link, .learndash_mark_complete_button, .gform_button button')){
      console.log('mouse down target next hit')

      const animation2 = document.createElement("div");
      animation2.setAttribute('class', 'overlay-983y58y43');
      animation2.innerHTML = `
        <div class="media-content">
          <img src="https://media1.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif">
        </div>
      `
      const overlay = document.getElementsByClassName("overlay-427542754")[0];
      overlay.appendChild(animation2);
    }
  });

  document.body.addEventListener('mouseout', event => {
    if(event.target.matches('.prev-link, .next-link, .learndash_mark_complete_button, .gform_button button')){
      const removeAnimation = document.getElementsByClassName("overlay-427542754")[0];
      document.body.removeChild(removeAnimation);
    }
  });
    document.body.addEventListener('click', event => {
      if(event.target.matches('.next-link, .learndash_mark_complete_button, .gform_button button')){

        chrome.runtime.sendMessage({activity_complete: true}, function(response) {
          console.log(response);
        });
      }
    });





  }
});
