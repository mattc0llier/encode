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

    const searchTagsNode = document.querySelector("#searchTags");
    const existingTagsNode = document.querySelector(".existing-tags");
    const newTagsNode = document.querySelector(".new-tags");
    const submitAllTagsButton = document.querySelector('#submit-all-tags');


    //activities
    const activityNode = document.createElement("div");
    activityNode.className = "activity";
    const existingActivity = `
      <p>✅${activity.objective}</p>
    `;
    activityNode.innerHTML = existingActivity

    activitiesNode.appendChild(activityNode)

    //tags
    let oldTags = topics
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

    let newTags = []

    let currentCharCount = 0;

    const charCount = function(input) {
      const pNode = document.querySelector(".counter");
      pNode.innerHTML = `Character count: ${input}`;
      pNode.style.color = input < 25 ? "black" : "red";
      currentCharCount = input;
    };

    let searchTagArr = []
    // serach all tags for topics that match what has been written in search
    formNode.addEventListener("keyup", function(event) {
      const inputText = document.querySelector(".text-area-input");
      charCount(inputText.textLength);

      searchTagsNode.innerHTML = '';
      // newTagsNode.removeChild(event.target.parentElement);
      // fetch all tags that includes what has been written so far and filter for those that already match
      fetch(`http://localhost:9090/api/tags/search?q=${inputText.value}%`, {
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

      // display returned filtered array in dropdown

    });

    // add a tag into the
    const submitTag = function(input) {
      console.log('input submitTag', input);
      // create tweet node
      const tagNode = document.createElement("div");
      tagNode.className = "tag";

      //push input into tag array
      newTags.push(input)
      console.log('new tag array', newTags);
      tagNode.innerHTML = `<p>${input.topic}</p> `;
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
      // init character count
      charCount("0");
    };

    //add what is in the text box to newTagArr and see if it exist already
    formNode.addEventListener("submit", function(event) {
      event.preventDefault();
      const inputText = document.querySelector(".text-area-input");
      if (currentCharCount > 0) {
        // submit tag and tag_id from filterArr
        //if filterArr is empty submit inputText.value
        console.log('new tag buttoon searchTagArr', searchTagArr);
        const newTag = function(){
          if (!searchTagArr.length) {
            return {
              tag_id: null,
              topic: inputText.value
            }
          } else {
            return {
              tag_id: searchTagArr[0].tag_id,
              topic: searchTagArr[0].topic
            }
          }
        }
        const newTagOutput = newTag()
        console.log('newTagOutput', newTagOutput);
        submitTag(newTagOutput);
      }
      inputText.value = "";
    });

    // submit all new tags to the db
    submitAllTagsButton.addEventListener("click", function(event) {
      console.log('Submit all tags');

      const sumbitAllNewTagsArr = newTags.map(tagTopic => (
        {
          newTagTopic: tagTopic,
          tag_id: null
        }
      ))
      console.log('sumbitAllNewTagsArr', sumbitAllNewTagsArr);

      const newTagsArr = sumbitAllNewTagsArr.filter(tag => !tag.tag_id)
      const existingTags = sumbitAllNewTagsArr.filter(tag => !!tag.tag_id)
      // Add the new tags arr to the db
      const submitNewTagsToDb = function(sumbitAllNewTagsArr) {
        fetch(`/api/tags`, {
          method: 'POST',
          body: JSON.stringify({
            sumbitAllExistingTagsArr: sumbitAllExistingTagsArr,
            sumbitAllNewTagsArr: sumbitAllNewTagsArr,
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
          console.log(body);
        })
      }
    });
})
