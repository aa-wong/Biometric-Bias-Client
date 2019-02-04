'use strict'

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/data', express.static(__dirname + '/public/data'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/images', express.static(__dirname + '/public/images'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')))

module.exports = app
