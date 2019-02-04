function App() {
  this.video = document.getElementById('video')
  this.canvas = document.getElementById('canvas')
  this.tracker = new tracking.ObjectTracker('face')
  this.context = this.canvas.getContext('2d')
  // this.gui = new dat.GUI()
}

App.prototype = {
  /**
   * Initialize the Facial Tracker
   * @return {[type]} [description]
   */
  init: function() {
    const tracker = this.tracker
    const context = this.context

    // Set the initial scale, steps and density values
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    // Begin tracking face with video camera
    tracking.track('#video', tracker, { camera: true })
    tracker.on('track', (event) => {
      // Reset canvas frame
      context.clearRect(0, 0, canvas.width, canvas.height)
      event.data.forEach(rect => this.drawFrame(rect))
    })
  },

  /**
   * Draw frame around the detected face being tracked
   * @param  {[type]} rect Face Rect
   * @return {[type]}      [description]
   */
  drawFrame: function(rect) {
    const context = this.context
    // Apply canvas to rect vallues
    context.strokeStyle = '#a64ceb'
    context.strokeRect(rect.x, rect.y, rect.width, rect.height)
    context.font = '11px Helvetica'
    context.fillStyle = "#fff"
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
  },
}
