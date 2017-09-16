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

  window.fetch('https://script.googleusercontent.com/macros/echo?user_content_key=G9mLr5qFRfacSf8ZQLHqWbjFtWF9J6w4MsU_b6TtJVq8-FypIYvDihz0u8Kv7y_kG-qmfYhO379iVn3Co4N31T-xYQJfeJsPm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMeBMJ8O4iJF_xIkjO_aX6cJp8BmOYgJRvPTYAVyaYRXKzBcIKtqBW0M8tGjeb2XmUW-dnclfdIe&lib=MlvES5UVJUJx1V4fkzaJs1r3tUZn2Fw3D')
    .then((res) => res.json())
    .then((performers) => performers.filter(p => !!p.name).map(performer => {
      performer.twitter = performer.twitter.replace(/^https?:\/\/twitter\.com\//,'')
      performer.twitterUrl = `https://twitter.com/${performer.twitter}`
      performer.soundcloud = performer.soundcloud.replace(/^https?:\/\/soundcloud\.com\//, '')
      performer.soundcloudUrl = `https://soundcloud.com/${performer.twitter}`
      return performer
    }))
    .then((performers) => {
      console.log(performers)
      const performersApp = new Vue({
        el: '#performers',
        data: {
          performers: performers
        }
      })
    })

    const updateLeftTimeElement = document.getElementById('leftTime')
    const updateLeftTime = () => {
      const startTime = 1505628000000 // Date.parse('2017/09/17 15:00+09:00')
      const leftTime = Math.floor((startTime - Date.now()) / 1000)
      if (leftTime < 0) {
        updateLeftTimeElement.textContent = '!!!!!! 現在開催中!今すぐ会場へGo !!!!!!'
        updateLeftTimeElement.scrollAmount = 40
        return
      }

      let t = null

      const days = Math.floor(leftTime / (60 * 60 * 24))
      t = leftTime % (60 * 60 * 24)
      const hour = Math.floor(t / (60 * 60))
      t = t % (60 * 60)
      const min = Math.floor(t / 60)
      const sec = t % 60

      updateLeftTimeElement.textContent = `開催まで残り${days}日${hour}時間${min}分${sec}秒!!!!!!!!!!`
      window.requestAnimationFrame(updateLeftTime)
    }
    updateLeftTime()
})()
