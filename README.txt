Test Execution Instructions
Prerequisites

1. Install Node.js version **16** or higher  
   Download from [https://nodejs.org/](https://nodejs.org/)

2. Install project dependencies:  
   ```bash
   npm install
Install WebDriver for your browser (e.g., ChromeDriver for Chrome):

Download the appropriate WebDriver from the official site: https://chromedriver.chromium.org/downloads

Make sure the WebDriver executable is added to your system PATH

3.Run all tests:
npx wdio run wdio.conf.js

4. Run a single test file:
npx wdio run wdio.conf.js --spec test/specs/file_name.e2e.js

5. What is tested:
User authorization and login flows
Footer buttons functionality and links
Complete checkout process including adding items, filling form, and order completion
Validation of empty cart scenarios

6. Project Structure:
test/specs/ — test files
pageobjects/ — Page Object Model classes for better maintainability
wdio.conf.js — WebdriverIO configuration file

7. Notes
Tests are written using Mocha framework and WebdriverIO
Ensure your browser version matches the WebDriver version to avoid compatibility issues
For any issues, check logs printed in the console for debugging
