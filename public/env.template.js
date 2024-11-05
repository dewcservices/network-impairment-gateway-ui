(function (window) {
  window.env = window.env || {}
  // env vars
  window['env']['production'] = true
  window['env']['apiHost'] = '${API_HOST}'
  window['env']['websocketHost'] = '${WEBSOCKET_HOST}'
})(this)
