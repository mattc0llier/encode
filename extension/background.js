// auth the user for chrome extension

// chrome.identity.launchWebAuthFlow(
//   {'url': 'https://localhost:9090/login', 'interactive': true},
//   function(redirect_url) { /* Extract token from redirect_url */ });

console.log('background file exists');

// update context on loading in a new page and send through response objective to content.js
 chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
  if(changeInfo.status == "loading" && tab.url.includes("lambdaschool.com")){
    console.log('tab.url', tab.url);

     fetch(`http://localhost:9090/api/tabContext?url=${tab.url}`, {
        mode: "cors"
      })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log('body', body);
        console.log('tab.id', tab.id);

        // send activity info to content.js.
        

        //recieves message when item is marked complete
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
              console.log('activity_complete');

            // to be triggered when completed objective click from content script
               return fetch(`http://localhost:9090/api/activities/${body[0].activity_id}`, {
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

      })
      .catch(error => console.log(error.message));
    }
  });
