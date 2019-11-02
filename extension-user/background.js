https://www.encode.app
// const client_id = 'mkhkokcinbeehocehnfenpgjfamooaib';
// const redirectUri = "https://www.encode.app/leaderboard"
// var auth_url = "https://localhost:9090/api/auth/account?client_id=" + client_id + "&redirect_uri=" + redirectUri + "&response_type=token";
//
// chrome.identity.launchWebAuthFlow({'url':auth_url,'interactive':true}, function(redirect_url){
//     console.log(redirect_url)
//   });

const fetchActivities = (url) => {
  return fetch(`https://www.encode.app/api/tabContext?url=${url}`, {
    mode: "cors"
  })
  .then((response) => response.json())
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!request.activity_complete) {
    return
  }

  console.log('activity_complete');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    fetchActivities(tabs[0].url)
    .then(body => {
      console.log('body before', body);
      console.log('body[0].activity_id ', body[0][0].activity_id);
     // to be triggered when completed objective click from content script
      return fetch(`https://www.encode.app/api/activities/${body[0][0].activity_id}`, {
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
     })
   })
});

chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "url_activities")

  port.onMessage.addListener(function(msg) {
    console.log('in content load listenr')

    if (!msg.content_loaded) {
      return
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      const url = tabs[0].url
      const urlIsLambdaSchool = url.includes("lambdaschool.com")
      const urlIsReplIt = url.includes("repl.it")

      if (!urlIsLambdaSchool || !urlIsReplIt) return

      fetchActivities(url)
        .then((body) => {
          console.log('sent activity')
          port.postMessage({activity: body})
        })
    })
  })
 })
