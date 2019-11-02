const port = chrome.runtime.connect({name: "url_activities"});
port.postMessage({content_loaded: true});
port.onMessage.addListener(function(response) {
  console.log('response popup', response);
  console.log('activities popup', response.activity[0]);
  console.log('activity popup', response.activity[0][0]);
  console.log('topics popup', response.activity[1]);
  const activity = response.activity[0][0]
  const topics = response.activity[1]

    //Start of popup tag search and form
    const formNode = document.querySelector("form");
    const activitiesNode = document.querySelector(".page-activities");
    const activityMasteryNode = document.querySelector(".activity-mastery");
    const searchTagsNode = document.querySelector("#searchTags");
    const existingTagsNode = document.querySelector(".existing-tags");
    const newTagsNode = document.querySelector(".new-tags");
    const submitAllTagsButton = document.querySelector('#submit-all-tags');

    //blooms taxonomy
    //Verbs needed for blooms taxonomy
    //should be random array with one primary verb.

    const remember = ["remember", "define", "duplicate", "list", "memorize", "repeat", "state",]
    const understand = ["understand", "classify", "describe", "discuss", "explain", "identify", "locate", "recognize", "report", "select", "translate"]
    const apply = ["apply", "execute", "implement", "solve", "use", "demonstrate", "interpret", "operate", "schedule", "sketch"]
    const analyze = ["analyze", "differentiate", "organize", "relate", "compare", "contrast", "distinguish", "examine", "experiment", "question", "test"]
    const evaluate = ["evaluate", "appraise", "argue", "judge", "defend", "select", "support", "value", "critique", "weigh"]
    const create = ["create", "design", "assemble", "construct", "conjecture", "develop", "formulate", "author", "investigate"]


    const bloomsMethods = {
      1: remember,
      2: understand,
      3: apply,
      4: analyze,
      5: evaluate,
      6: create
    }
    function getBlooms(mastery_score){
      console.log(mastery_score);
      const primaryVerb = bloomsMethods[mastery_score][0]
      console.log('primaryVerb', primaryVerb);
      const index1 = Math.floor(Math.random() * 6);
      const index2 = Math.floor(Math.random() * 6);
      const secondaryVerb = bloomsMethods[mastery_score][index1]
      console.log('secondaryVerb', secondaryVerb);
      const thirdVerb = bloomsMethods[mastery_score][index2]
      console.log('thirdVerb', thirdVerb);

      return [primaryVerb, secondaryVerb, thirdVerb]
    }

    const bloomsCategories = getBlooms(activity.mastery_score)

    console.log('bloomsCategories', bloomsCategories);

    const blooms = `
      <h2>Mastery score +${activity.mastery_score}</h2>
      <ul class="topic-notfications">
          ${bloomsCategories.map(verb => `<li>${verb}</li>`).join('')}
       </ul>
      `;
    activityMasteryNode.innerHTML = blooms


    //activities
    const activityNode = document.createElement("div");
    activityNode.className = "activity";
    const existingActivity = `
      <span style="display: ${activity.complete == false ? 'none' : 'block' }">✅</span>
      <span style="display: ${activity.complete == true ? 'none' : 'block' }">🤔</span>
      <p>${activity.objective}</p>
    `;
    activityNode.innerHTML = existingActivity
    activitiesNode.appendChild(activityNode)

    //tags
    let oldTags = topics
    let newTags = []
    let searchTagArr = []

    // onreceiving message add existing topics into old tags
    if (!oldTags.length) {
      const notifications = null
      return notifications
    } else {
      const notifications = `
        <ul class="topic-notfications">
            ${topics.map(topic => `<li>${topic.topic}</li>`).join('')}
         </ul>
        `;
      existingTagsNode.innerHTML = notifications
    }


    // serach all tags for topics that match what has been written in search
    formNode.addEventListener("keyup", function(event) {
      const inputText = document.querySelector(".text-area-input");
      searchTagsNode.innerHTML = '';
      // newTagsNode.removeChild(event.target.parentElement);
      // fetch all tags that includes what has been written so far and filter for those that already match
      fetch(`https://www.encode.app/api/tags/search?q=${inputText.value}%`, {
        mode: "cors"
      })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        console.log('body', body);
        searchTagArr = body
        const searchTags = `
            ${searchTagArr.map(existingTags => `<option value="${existingTags.topic}" class="currentTag">`).join('')}
        `;
        searchTagsNode.innerHTML = searchTags
      })
      .catch(error => console.log(error.message));
    });


    // add a tag into the array to be be added to db
    const submitTag = function(input) {
      console.log('input submitTag', input);
      // create tweet node
      const tagNode = document.createElement("ul");
      tagNode.className = "topic-notifications";

      //push input into tag array
      newTags.push(input)
      console.log('new tag array', newTags);
      tagNode.innerHTML = `<li>${input.topic}</li> `;
      // create button node
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      // appending delete button to tagNode
      tagNode.appendChild(deleteButton);
      //append tweet node to newTagsNode
      newTagsNode.appendChild(tagNode);
      // clears text area

      //Setting event listener on delete button
      deleteButton.addEventListener("click", function(event) {
        let updatedTags = newTags.filter(word => word !== input)
        console.log('updatedTags array - a.delete', updatedTags);
        newTagsNode.removeChild(event.target.parentElement);

      });
    };

    //add what is in the text box to newTagArr and see if it exist already
    formNode.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log('add tag hit');
      const inputTextArea = document.querySelector(".text-area-input");
      let inputTextValue = inputTextArea.value
        // submit tag and tag_id from filterArr
        //if filterArr is empty submit inputTex .value
        console.log('new tag buttoon searchTagArr', searchTagArr);
          console.log('new tag buttoon searchTagArr', inputTextValue);
        const newTag = function(){
          if (!searchTagArr.length) {
            return {
              tag_id: null,
              topic: inputTextValue
            }
          } else {
            return {
              //just getting the first in array rather than actual tag object
              tag_id: searchTagArr[0].tag_id,
              topic: searchTagArr[0].topic
            }
          }
        }
        const newTagOutput = newTag()
        console.log('newTagOutput', newTagOutput);
        submitTag(newTagOutput);

      inputTextArea.value = "";
    });

    // submit all new tags to the db
    submitAllTagsButton.addEventListener("click", function(event) {
      console.log('Submit all tags');
      console.log('newTags - Submit all', newTags);

      // Add the new tags arr to the db
      const submitNewTagsToDb = function(newTags) {
        console.log('submitNewTagsToDb hit');
        console.log('activity.objective_id', activity.objective_id);
        console.log('newTags', newTags);

        fetch(`https://www.encode.app/api/tags`, {
          method: 'POST',
          body: JSON.stringify({
            newTags: newTags,
            objective_id: activity.objective_id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function(response) {
          return response.json();
        })
        .then(body => {
          newTags = []
          console.log(body);
        })
      }
      submitNewTagsToDb(newTags)
    });
})
