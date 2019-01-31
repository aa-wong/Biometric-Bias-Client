# Biometric-Bias
The Biometric Bias aims to question the viewer's trust in society's increasing reliance on machine-based decision making through an algorithm trained on human bias data-sets. Using machine learning algorithms, we have developed and trained an AI on a data-set of (supplied by the University of Chicago) which contains thousands of peoples faces and the many assumptions made by participants who viewed the faces (such as friendliness, trustworthiness, perceived threat level, socio-economic status, etc.). Attendees of the Tech Art Fair viewing the exhibit stand in front of a camera and screen which analyzes their face and makes assumptions about them based on their appearance in relation to the appearance of similar looking people in the data-set.

# Setup

```bash
# Install server
$ npm install
# Start development server
$ npm run dev
```
Server runs on port 3000,

http://localhost:3000

# Folder Structure
```bash
app
  |# Site Folder
  |_public
    |# OpenCV Files
    |_assets
    |# Style Files
    |_css
    |# Data Files
    |_data
    |# Image Files
    |_images
    |# Javascript implementation files
    |_js
      |# Main app implementation file
      |_main.js
      |# video tracking file
      |_tracking-min.js
    |# Main Website HTML file
    |_index.html
  |# Server
  |_index.js
  |# Dev Server
  |_server.js
```
