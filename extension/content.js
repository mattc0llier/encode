console.log("content script is running");

//recieve objective activity details
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

document.body.addEventListener('submit', event => {
  if(event.target.matches('.learndash_mark_complete_button, .gform_button button')){
    alert(event.target.className)
  }
});

var COLORS = [
  "https://media1.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  "https://media2.giphy.com/media/slOhiKAVFgwr6/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  "https://media0.giphy.com/media/fdyZ3qI0GVZC0/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  "https://media1.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  "https://media2.giphy.com/media/slOhiKAVFgwr6/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
  "https://media0.giphy.com/media/fdyZ3qI0GVZC0/giphy.gif?cid=6ca70afc5d3af164694436425928b936&rid=giphy.gif",
];

function getGif() {
  var index = Math.floor(Math.random() * 6);

  return COLORS[index];
}

const randomGif = getGif();
console.log('randomGif', randomGif);

document.body.addEventListener('mouseover', event => {
  if(event.target.matches('.next-link, .learndash_mark_complete_button, .gform_button button')){
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
            display: flex;
            align-items: center;
          }
          .mastery_score-wut h1 {
            color: #ffffff;
            font-weight: 600;
          }
          .info-test-diff {
            padding: 0.5rem 1rem;
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

    const animation = document.createElement("div");
    animation.setAttribute('class', 'overlay-427542754');
    animation.innerHTML = `
        <div class="notifications" id="slide">
          <div class="main-notfiication">
            <div class="mastery_score-wut">
              <h1>+3</h1>
            </div>
            <div class="info-test-diff">
              <div class="title-test-hello">
                <p>
                  Learn about the Box Model and
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

        </div>
    `

    document.body.appendChild(animation);


    // chrome.webRequest.onBeforeRequest.addListener(
    //     function(details) {
    //       return setTimeout(() => return, 6000);;
    //     },
    //     {urls: [“<all_urls>”]},
    //     [“requestBody”]);
  }
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
  if(event.target.matches('.next-link, .learndash_mark_complete_button, .gform_button button')){

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
