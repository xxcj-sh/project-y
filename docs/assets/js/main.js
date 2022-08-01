(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Render Header text
   */
  let yearText = select('#year-text')
  if (yearText) {
    var currentYearText = new Date().getFullYear().toString();
    yearText.innerHTML = currentYearText + " 年剩余时间"
  }


  /**
   * Countdown timer
   */
  let countdown = select('.countdown');
  let saying = select('#saying');
  const output = countdown.innerHTML;
  const sayingList = [
    "人生天地之间，若白驹过隙，忽然而已", 
    "劝君莫惜金缕衣，劝君惜取少年时",
    "莫等闲、白了少年头，空悲切",
    "元数据项目即将面世"
  ];
  const countDownDate = function () {
    var currentTime = new Date();
    var currentYear = (currentTime.getFullYear() + 1).toString();
    var firstDayOfNextYear = new Date(currentYear);

    let timeleft = firstDayOfNextYear.getTime() - currentTime.getTime();

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdown.innerHTML = output.replace('%d', days).replace('%h', hours).replace('%m', minutes).replace('%s', seconds);

    // Update saying every 5 seconds
    saying.innerHTML = sayingList[Math.floor(timeleft/5000) % sayingList.length]
    console.log(Math.floor(timeleft/5000));

  }
  countDownDate();
  setInterval(countDownDate, 1000);

})()