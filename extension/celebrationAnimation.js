var styleEl = document.createElement('style');
styleEl.innerHTML = `.achievement-wrapper {
  position: fixed;
  bottom: -100px;
  left: 0;
  right: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.achievement-super {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.achievement-body {
  position: relative;
  -webkit-transform: translateY(64px);
  transform: translateY(64px);
  margin: 0 auto;
  width: 64px;
  overflow: hidden;
  height: 64px;
  line-height: 24px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  border-radius: 32px;
  background-color: #3424AC;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 40%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  background-repeat: no-repeat;
  background-size: 50% 100%;
  background-position: -100%;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.achievement-body .achievement-text {
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  opacity: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.achievement-body .achievement-subtext {
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 300;
  opacity: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}

.achievement-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  width: 64px;
  height: 64px;
  border-radius: 32px;
  line-height: 64px;
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 16px;
}

.achievement-wrapper.animation {
  animation: slideUp 750ms cubic-bezier(0.75, -0.5, 0, 1.75) 0s 1 forwards,
    slideDown 750ms cubic-bezier(0.75, -0.5, 0, 1.75) 5450ms 1 forwards;
  -webkit-animation: slideUp 750ms cubic-bezier(0.75, -0.5, 0, 1.75) 0s 1
      forwards,
    slideDown 750ms cubic-bezier(0.75, -0.5, 0, 1.75) 5450ms 1 forwards;
}

.achievement-wrapper.animation .achievement-title {
  animation: slideLeft 750ms ease 650ms 1 forwards,
    setColor 750ms ease 650ms 1 forwards, ripple 500ms ease 1200ms 1,
    slideRight 750ms ease 4750ms 1 forwards,
    removeColor 750ms ease 4750ms 1 forwards;
  -webkit-animation: slideLeft 750ms ease 650ms 1 forwards,
    setColor 750ms ease 650ms 1 forwards, ripple 500ms ease 1200ms 1,
    slideRight 750ms ease 4750ms 1 forwards,
    removeColor 750ms ease 4750ms 1 forwards;
}

.achievement-wrapper.animation .achievement-body {
  animation: expand 750ms ease 650ms 1 forwards,
    contract 750ms ease 4750ms 1 forwards, shimmer 1500ms linear 1400ms 2;
  -webkit-animation: expand 750ms ease 650ms 1 forwards,
    contract 750ms ease 4750ms 1 forwards, shimmer 1500ms linear 1400ms 2;
}

.achievement-wrapper.animation .achievement-text {
  animation: fadeInUp 550ms ease 1250ms 1 forwards,
    fadeOutUp 550ms ease 4250ms 1 forwards;
  -webkit-animation: fadeInUp 550ms ease 1250ms 1 forwards,
    fadeOutUp 550ms ease 4250ms 1 forwards;
}

.achievement-wrapper.animation .achievement-subtext {
  animation: fadeInUp 550ms ease 1350ms 1 forwards,
    fadeOutUp 550ms ease 4350ms 1 forwards;
  -webkit-animation: fadeInUp 550ms ease 1350ms 1 forwards,
    fadeOutUp 550ms ease 4350ms 1 forwards;
}

@-webkit-keyframes slideUp {
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  100% {
    transform: translateY(-135px);
    -webkit-transform: translateY(-135px);
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  100% {
    transform: translateY(-135px);
    -webkit-transform: translateY(-135px);
  }
}

@-webkit-keyframes slideDown {
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  0% {
    transform: translateY(-135px);
    -webkit-transform: translateY(-135px);
  }
}

@keyframes slideDown {
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
  0% {
    transform: translateY(-135px);
    -webkit-transform: translateY(-135px);
  }
}

@-webkit-keyframes setColor {
  0% {
    background: rgba(255, 255, 255, 0);
  }
  100% {
    background: rgba(255, 255, 255, 0.2);
  }
}

@keyframes setColor {
  0% {
    background: rgba(255, 255, 255, 0);
  }
  100% {
    background: rgba(255, 255, 255, 0.2);
  }
}

@-webkit-keyframes removeColor {
  100% {
    background: rgba(255, 255, 255, 0);
  }
  0% {
    background: rgba(255, 255, 255, 0.2);
  }
}

@keyframes removeColor {
  100% {
    background: rgba(255, 255, 255, 0);
  }
  0% {
    background: rgba(255, 255, 255, 0.2);
  }
}

@-webkit-keyframes slideLeft {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translate(calc(-48vw + 32px));
    transform: translate(calc(-48vw + 32px));
  }
}

@keyframes slideLeft {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translate(calc(-48vw + 32px));
    transform: translate(calc(-48vw + 32px));
  }
}

@-webkit-keyframes slideRight {
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  0% {
    -webkit-transform: translate(calc(-48vw + 32px));
    transform: translate(calc(-48vw + 32px));
  }
}

@keyframes slideRight {
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  0% {
    -webkit-transform: translate(calc(-48vw + 32px));
    transform: translate(calc(-48vw + 32px));
  }
}

@-webkit-keyframes expand {
  0% {
    width: 64px;
  }
  100% {
    width: 96vw;
    padding: 8px 40px;
  }
}

@keyframes expand {
  0% {
    width: 64px;
  }
  100% {
    width: 96vw;
    padding: 8px 40px;
  }
}

@-webkit-keyframes contract {
  100% {
    width: 64px;
  }
  0% {
    width: 96vw;
    padding: 8px 40px;
  }
}

@keyframes contract {
  100% {
    width: 64px;
  }
  0% {
    width: 96vw;
    padding: 8px 40px;
  }
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@-webkit-keyframes fadeOutUp {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}

@-webkit-keyframes ripple {
  100% {
    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.08);
  }
  0% {
    box-shadow: inset 0 0 5px 50px rgba(0, 0, 0, 0);
  }
}

@keyframes ripple {
  100% {
    box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.08);
  }
  0% {
    box-shadow: inset 0 0 5px 50px rgba(0, 0, 0, 0);
  }
}

@-webkit-keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media only screen and (min-width: 480px) {
  @-webkit-keyframes slideLeft {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translate(-150px);
      transform: translate(-150px);
    }
  }

  @keyframes slideLeft {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translate(-150px);
      transform: translate(-150px);
    }
  }

  @-webkit-keyframes slideRight {
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    0% {
      -webkit-transform: translate(-150px);
      transform: translate(-150px);
    }
  }

  @keyframes slideRight {
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    0% {
      -webkit-transform: translate(-150px);
      transform: translate(-150px);
    }
  }

  @-webkit-keyframes expand {
    0% {
      width: 64px;
    }
    100% {
      width: 364px;
      padding: 8px 40px;
    }
  }

  @keyframes expand {
    0% {
      width: 64px;
    }
    100% {
      width: 364px;
      padding: 8px 40px;
    }
  }

  @-webkit-keyframes contract {
    100% {
      width: 64px;
    }
    0% {
      width: 364px;
      padding: 8px 40px;
    }
  }

  @keyframes contract {
    100% {
      width: 64px;
    }
    0% {
      width: 364px;
      padding: 8px 40px;
    }
  }
}
`;
document.head.appendChild(styleEl);

const animation = document.createElement("div");
animation.setAttribute('class', 'achievement-wrapper animiation');
animation.innerHTML = `
<div class="achievement-wrapper animation">
  <div class="achievement-super">
    <div class="achievement-body">
      <p class="achievement-text">Quiz: HTML and CSS (1/3)</p>
      <p class="achievement-subtext">js - html - css</p>
    </div>
    <div class="achievement-title">
      <span>+3</span>
    </div>
  </div>
</div>
`
document.body.appendChild(animation);
