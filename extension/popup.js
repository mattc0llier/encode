const formNode = document.querySelector("form");

const searchTagsNode = document.querySelector(".search-tags");
const newTagsNode = document.querySelector(".new-tags");
var submitAllTagsButton = document.getElementById('submit-all-tags');

let oldTags = []
// onreceiving message add existing topics into old tags

let newTags = []

let currentCharCount = 0;

const charCount = function(input) {
  const pNode = document.querySelector(".counter");
  pNode.innerHTML = `Character count: ${input}`;
  pNode.style.color = input < 25 ? "black" : "red";
  currentCharCount = input;
};

//serach all tags for topics that match what has been written in search
formNode.addEventListener("keyup", function(event) {
  const inputText = document.querySelector(".text-area-input");
  charCount(inputText.textLength);
  let searchTagArr = []

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
    searchTagArr.forEach(tag => {
      console.log('tag', tag);
      const currentSearchTagNode = document.createElement("div");
      currentSearchTagNode.className = "currentTag";
      currentSearchTagNode.innerHTML = `<span>${tag.topic}</span> `;
      searchTagsNode.appendChild(currentSearchTagNode);
    })



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
  tagNode.innerHTML = `<span>${input}</span> `;
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

formNode.addEventListener("submit", function(event) {
  event.preventDefault();
  const inputText = document.querySelector(".text-area-input");
  if (currentCharCount > 0) {
    // submit tag and tag_id from filterArr
    //if filterArr is empty submit inputText.value
    const newTag = function(){
      if (!searchTagsNode.length) {
        return {
          tag_id: null,
          topic: inputText.value
        }
      } else {
        return {
          tag_id: searchTagsNode.tag_id,
          topic: searchTagsNode.topic
        }
      }
    }


    console.log('newTag', newTag);
    submitTag(inputText.value);
    console.log('input submit', inputText.value);
  }
  inputText.value = "";
});

// submit all new tags to the db
submitAllTagsButton.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log('Submit all tags');
});

// Add the new tags arr to the db
const submitNewTagsToDb = function(newTags) {
  fetch(`/api/tags`, {
    method: 'POST',
    body: JSON.stringify({
      newTags: newTags,
      objective_id: 1
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
