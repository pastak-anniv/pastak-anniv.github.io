'use strict'
;(() => {
  const mainVisualImage = new Image()
  const mainVisualElement = document.getElementById('mainVisual')
  mainVisualImage.src = './img/main.jpg'

  const glitchMainVisual = () => {
    const option = {
      seed: Math.floor(Math.random() * 99),
      quality: 99,
      iterations: Math.floor(Math.random() * 40)
    }
    glitch(option)
      .fromImage(mainVisualImage)
      .toDataURL()
      .then((dataUrl) => {
        mainVisualElement.src = dataUrl
      })
    window.setTimeout(glitchMainVisual, (Math.random() * 700) + 300)
  }

  if (mainVisualImage.complete) {
    glitchMainVisual()
  } else {
    mainVisualImage.addEventListener('load', glitchMainVisual)
  }
  mainVisualElement.addEventListener('error', () => {
    mainVisualElement.src = './img/main.jpg'
  })
})()
