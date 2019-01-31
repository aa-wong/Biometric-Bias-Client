# Biometric-Bias
The Biometric Bias an art piece that aims to question the viewer's trust in society's increasing reliance on machine-based decision making through an algorithm trained on human bias data-sets. Using machine learning algorithms, we have developed and trained an AI on a data-set (supplied by the University of Chicago) of which contains thousands of peoples faces and the many assumptions made by participants who viewed the faces (such as friendliness, trustworthiness, perceived threat level, socio-economic status, etc.).

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
  |# Server
  |_index.js
  |# Dev Server
  |_server.js
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
```
