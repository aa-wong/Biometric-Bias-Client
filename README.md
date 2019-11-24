# Biometric-Bias
The Biometric Bias an art piece that aims to question the viewer's trust in society's increasing reliance on machine-based decision making through an algorithm trained on human bias data-sets. Using machine learning algorithms, we have developed and trained an AI on a data-set (supplied by the University of Chicago) of which contains thousands of peoples faces and the many assumptions made by participants who viewed the faces (such as friendliness, trustworthiness, perceived threat level, socio-economic status, etc.).

# Setup

```bash
# Install server
$ npm install
# Start development server
$ npm run watch
```
Server runs on port 3000,

http://localhost:3000

# Live demo
https://biometricbias.com/

# Folder Structure
```bash
app
  |_index.js # Server
  |_server.js # Dev Server
  |_public # Site Folder
    |_index.html # Main Website HTML file
    |_assets # OpenCV Files
    |_css # Style Files
    |_data # Data Files
    |_images # Image Files
    |_js # Javascript implementation files
      |_main.js # Main app implementation file
      |_tracking-min.js # video tracking file
```
