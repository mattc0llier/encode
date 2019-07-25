console.log('background file exists');
let currentActivity = []

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "./celebrationAnimation.js"
  });
   return fetch(`http://localhost:9090/api/activities/470`, {
    method: 'PATCH',
    body: JSON.stringify({ complete: true }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(body => {
    console.log('body', body);
  })
  .catch(error => console.log(error.message));
});


// update context on loading in a new page and send through response objective to content.js
 chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   console.log('tab.url', tab.url);
  if(changeInfo.status == "loading"){

     fetch(`http://localhost:9090/api/tabContext?url=${tab.url}`, {
        mode: "cors"
      })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log('body', body);
        console.log('tab.id', tab.id);
        let currentActivity = body

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          console.log('tabs[0].id', tabs[0].id);
          chrome.tabs.sendMessage(tabs[0].id, currentActivity)
        });


      })
      .catch(error => console.log(error.message));
    }
  });
