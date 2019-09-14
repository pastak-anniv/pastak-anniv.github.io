'use strict'
;(() => {
    const updateLeftTimeElement = document.getElementById('leftTime')
    const updateLeftTime = () => {
      const startTime = 1568530800000; // Date.parse('2019/09/15 16:00+09:00')
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
    if (/ref=dpz/.test(location.search)) {
      document.body.classList.add('from-dpz')
    }
})()
