![Biometric Bias](https://raw.githubusercontent.com/aa-wong/Biometric-Bias-Client/development/Biometric-Bias-logo.jpg)

# Biometric Bias
Artificial Intelligence / Website / Logo & Identity / Event Signage

Biometric Bias is an Artificial Intelligence (AI) project that questions our increasing reliance on machine-based decision making by demonstrating the consequences of AI when trained on inherently biased data.

Developed for the Ontario Science Center’s annual Tech Art Fair, Furia and a team of three other creative industry professionals developed and trained an AI on The Chicago Face Database — a research study data-set consisting of hundreds of photographs of peoples faces that had been subjectively rated by over one thousand participants who took part in the study (ratings included how threatening, attractive, trustworthy, happy, and depressed the people in the photographs looked). The Biometric Bias AI first analyzed extensive facial measurements and physical properties of the photos, then correlated this data with the ratings of the biases of the participant study. A web application was then developed so that attendees of the Tech Art Fair could interact with Biometric Bias by standing in front of a digital screen and have their facial data analyzed through a webcam in order for the AI to make assumptions about them based on the ratings of similar faces from the data-set.

Over 15,000 people interacted with Biometric Bias over the course of the three-day event, provoking much thought and discussion concerning the implications of AI built on biased data-sets (whether conscious or unconscious) as we transfer more and more authority from human intelligence to artificial intelligence.

![Biometric Bias - UI](https://raw.githubusercontent.com/aa-wong/Biometric-Bias-Client/development/Biometric-Bias-AI-UI-UX-design.jpg)

# Live demo
Note this project was designed for artist purposes and not optimized for all platforms. Use only on desktop and laptops
Disclaimer: All models calculations are run on the client side in the browser. No images are sent through the internet. For best performance please use google chrome and on load wait few seconds for the camera to start.

https://biometricbias.com/

# Setup

```bash
# Install server
$ npm install
# Start development server
$ npm run watch
```
Server runs on port 3000,

http://localhost:3000

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
