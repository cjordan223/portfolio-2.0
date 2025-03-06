#!/bin/bash

# Set the environment variable for GitHub Pages deployment
export GITHUB_PAGES=true

# Run the predeploy and deploy scripts
npm run predeploy
npm run deploy

echo "Deployed to GitHub Pages successfully!" 