// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//       var firstHref = "hello";
//       document.body.addEventListener('click', clicked, true);
//       console.log(firstHref);
//     }
//   }
// )

document.body.addEventListener('submit', event => {
  if(event.target.matches('.learndash_mark_complete_button, .gform_button button')){
    alert(event.target.className)
  }
});
document.body.addEventListener('click', event => {
  if(event.target.matches('.prev-link, .next-link')){
    alert(event.target.className)
    console.log('run animation');
    // const animation = document.createElement("div");
    // animation.setAttribute('class', 'celebration-animation');
    // animation.innerHtml = `<div class="achievement-wrapper">
    //       <div class="achievement-super">
    //         <div class="achievement-body">
    //           <p class="achievement-text">Type of mastery</p>
    //           <p class="achievement-subtext">Objective</p>
    //         </div>
    //         <div class="achievement-title">
    //           <span>+3</span>
    //         </div>
    //       </div>
    //     </div>`
    //
    // console.log('animation', animation);
    //
    //
    // document.body.appendChild(animation);
  }
});
