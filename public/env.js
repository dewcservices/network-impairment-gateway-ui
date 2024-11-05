;(function (window) {
  window.env = window.env || {}
  // env vars
  window['env']['production'] = false
  window['env']['apiHost'] = 'http://localhost:8000'
  window['env']['websocketHost'] = 'ws://localhost:8000'
})(this)
