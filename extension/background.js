console.log('background file exists');

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "./celebrationAnimation.js"
  });
});


// update context on loading in a new page
 chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
   console.log('tab.url', tab.url);
  if(changeInfo.status == "loading"){

     fetch(`http://localhost:9090/api/tabContext?url=${tab.url}`, {
        mode: "cors"
      })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(body => {
        console.log(body);
      })
      .catch(error => console.log(error.message));
    }
  });
