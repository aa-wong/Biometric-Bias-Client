function App() {
  this.video = document.getElementById('video')
  this.canvas = document.getElementById('canvas')
  this.ctx = this.canvas.getContext('2d')
  this.padding = 100
  this.imageResolution = [300, 300]
}

App.prototype = {
  /**
   * Initialize the Facial Tracker
   * @return {[type]} [description]
   */
  init: function() {
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
    this.cropImage(rect)
  },

  /**
   * Crop the image
   * @param  {[type]} crop [description]
   * @return {[type]}      [description]
   */
  cropImage: function(crop) {
    // Get Video Frame
    const frame = this.videoFrame()
    // Extract crop values
    const { x, y, width, height } = crop
    // Crop the image frame with crop size
    const imgData = frame.getImageData(x, y, width, height)
    // copy the image
    const imageUrl = this.cropCopy(imgData, width, height)
    // resize the image
    this.resizeImage(imageUrl)
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
    return frameCtx
  },

  /**
   * [description]
   * @param  {[type]} imgData [description]
   * @param  {[type]} width   [description]
   * @param  {[type]} height  [description]
   * @return {[type]}         [description]
   */
  cropCopy: function(imgData, width, height) {
    // Create a canvas for the crop image
    const cropCanvas = document.createElement('canvas')
    // Set size
    cropCanvas.width = width
    cropCanvas.height = height
    const cropCtx = cropCanvas.getContext('2d')
    // Apply the image data
    cropCtx.putImageData(imgData, 0, 0)
    // Return the src url
    return cropCanvas.toDataURL("image/png")
  },

  /**
   * Resize Image
   * @param  {[type]} imgSrc [description]
   * @return {[type]}        [description]
   */
  resizeImage: function(imgSrc) {
    // Extract defined image resolution
    const [w, h] = this.imageResolution
    // create image object
    const image = new Image()

    image.onload = () => {
      // Use canvas to resize the image
      const canvas = document.createElement('canvas')
  		const ctx = canvas.getContext("2d")
      // apply the image resolution
  		ctx.clearRect(0, 0, w, h)
      image.width = w
      image.height = h
  		canvas.width = image.width
  		canvas.height = image.height
      // Draw the image to the new resolution
  		ctx.drawImage(image, 0, 0, image.width, image.height)

      // final iamge result
      const imageUrl = canvas.toDataURL('image/png')
      // const img = imageSerializer(imageUrl)
      // console.log(img)
      const img = new Image()
      img.src = imageUrl
      this.predict(img)
    }
    image.src = imgSrc
  },

  predict: async function(img) {
    const model = await tf.loadModel('/models/gender_model/model.json')
    const meanImageNetRGB = tf.tensor1d([123.68,116.779,103.939])
    const tensor = tf.fromPixels(img)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .sub(meanImageNetRGB)
                    .reverse(2)
                    .expandDims()

    const prediction = await model.predict(tensor).data()
    const label = ['male', 'female']
    label.forEach((label, i) => console.info(label, prediction[i] * 100))
  },
}

function imageSerializer(imageUrl) {
  // Split the base64 string in data and contentType
  const block = imageUrl.split(";")
  // Get the content type of the image
  const contentType = block[0].split(":")[1]// In this case "image/gif"
  // get the real base64 content of the file
  const realData = block[1].split(",")[1]// In this case "R0lGODlhPQBEAPeoAJosM...."
  // Convert it to a blob to upload
  return b64toBlob(realData, contentType)
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512
  const byteCharacters = atob(b64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, {type: contentType})
}
