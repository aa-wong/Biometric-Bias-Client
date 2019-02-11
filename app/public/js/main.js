function App(http) {
  this.video = document.getElementById('video')
  this.canvas = document.getElementById('canvas')
  this.ctx = this.canvas.getContext('2d')
  this.padding = 150
  this.imageResolution = [300, 300]
  this.modelNames = [
    'gender',
    // 'threatening'
  ]
}

App.prototype = {
  /**
   * Initialize the Facial Tracker
   * @return {[type]} [description]
   */
  init: function(http) {
    this.http = http
    this.loadModels()
    .then(models => {
      this.models = models
      console.log(this.models)
      this.startTracking()
    })
    .catch(err => console.error('Load models Error ::', err))
  },

  loadModels: function() {
    return new Promise((resolve, reject) => {
      Promise.all(this.modelNames.map(name => {
        return Promise.all([
          name,
          tf.loadModel(`/models/${name}/model.json`),
          this.http.GET(`/models/${name}/classifiers.json`)
        ])
      }))
      .then(models => {
        resolve(models.map((modelObj) => {
          return {
            name: modelObj[0],
            model: modelObj[1],
            classifers: JSON.parse(modelObj[2])
          }
        }))
      })
      .catch(err => reject('Load Models Error :: ' + err))
    })
  },

  startTracking: function() {
    const tracker = new tracking.ObjectTracker('face')
    const ctx = this.ctx
    const padding = this.padding

    // Set the initial scale, steps and density values
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.1)
    // Begin tracking face with video camera
    tracking.track('#video', tracker, { camera: true })
    tracker.on('track', (event) => {
      // Reset canvas frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      event.data.forEach(rect => {
        const { x, y, width, height } = rect
        this.drawFrame({
          x: x - (padding / 2),
          y: y - (padding / 2),
          width: width + padding,
          height: height + padding
        })
      })
    })
  },

  /**
   * Draw frame around the detected face being tracked
   * @param  {[type]} rect Face Rect
   * @return {[type]}      [description]
   */
  drawFrame: function(rect) {
    const ctx = this.ctx
    // Apply canvas to rect vallues
    ctx.strokeStyle = '#a64ceb'
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
    ctx.font = '11px Helvetica'
    ctx.fillStyle = "#fff"
    ctx.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
    ctx.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
    this.processImageWithRect(rect)
  },

  /**
   * Crop the image
   * @param  {[type]} crop [description]
   * @return {[type]}      [description]
   */
  processImageWithRect: function(frame) {
    // Get Video Frame
    const videoFrame = this.videoFrame()
    // Load image from img src
    this.predict(videoFrame, frame)
  },

  /**
   * Snap a video frame
   * @return {Context} context of the video frame
   */
  videoFrame: function() {
    // Extract video parameters
    const video = this.video
    const vw = video.width
    const vh = video.height

    // Create a video frame canvas to snape an image from the video frame
    const frameCanvas = document.createElement('canvas')
    // Size the frame canvas
    frameCanvas.width = vw
    frameCanvas.height = vh
    const frameCtx = frameCanvas.getContext('2d')
    // Snap an image frame from the video
    frameCtx.drawImage(video, 0, 0, vw, vh)
    return frameCanvas.toDataURL()
  },

  loadAndProcessImg: function(img, frame) {
    // const croppedImg = this.cropImage(img, frame)
    const resizedImg = this.resizeImage(img)
    const batchedImg = this.batchImage(resizedImg)
    return batchedImg
  },

  loadImage: async function(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve(tf.fromPixels(img))
      img.onerror = (e) => reject(e)
    })
  },

  cropImage: function(img, frame) {
    // Extract crop values
    const {
      x,
      y,
      width,
      height
    } = frame
    return img.slice([x, y, 0], [width, height, 3])
  },

  resizeImage: function(image) {
    return tf.image.resizeBilinear(image, [224, 224])
  },

  batchImage: function(image) {
    // Expand our tensor to have an additional dimension, whose size is 1
    const batchedImage = image.expandDims(0)
    // Turn pixel data into a float between -1 and 1.
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1))
  },

  predict: async function(imgSrc, frame) {
    this.loadImage(imgSrc).then(img => {
      const processedImg = this.loadAndProcessImg(img, frame)
      this.models.forEach(ml => {
        const {
          name,
          model,
          classifers
        } = ml

        model.predict(processedImg).data()
        .then(prediction => {
          const confidence = Math.max(...prediction)
          const index = prediction.indexOf(confidence)
          document.getElementById(name).innerHTML = classifers[index]
        })
        .catch(err => console.error('prediction error ::', err))
      })
    })
    .catch(err => console.error('Load Image Error ::', err))
  },
}
