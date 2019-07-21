const animation = document.createElement("div");
animation.setAttribute('class', 'achievement-wrapper animation');
animation.innerHtml = `
      <div class="achievement-super">
        <div class="achievement-body">
          <p class="achievement-text">Type of mastery</p>
          <p class="achievement-subtext">Objective</p>
        </div>
        <div class="achievement-title">
          <span>+3</span>
        </div>
      </div>
      `

console.log('animation', animation);


document.body.appendChild(animation);
