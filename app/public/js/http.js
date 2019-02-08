function Http() {}

Http.prototype = {
  /**
   * Initialize the Facial Tracker
   * @return {[type]} [description]
   */
  init: function() {
    this.request = new XMLHttpRequest()
  },

  GET: function(url) {
    return new Promise((resolve, reject) => {
      const xhr = this.request
      xhr.open('GET', url)
      xhr.timeout = 3000
      xhr.onload = (e) => {
        if (xhr.readyState === 4) {
          const status = xhr.status
          if (status === 200) resolve(xhr.response)
          else reject(xhr.statusText)
        }
      }

      xhr.onerror = (e) => {
        reject(xhr.statusText)
      }
      xhr.send()
    })
  }
}
