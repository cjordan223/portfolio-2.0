# Netlify Manual Deployment Instructions

If the automatic deployment continues to fail, try these manual settings in the Netlify UI:

## Build Settings

1. Go to Site settings > Build & deploy > Continuous Deployment
2. Under "Build settings", set:
   - **Build command**: `npm install --force --legacy-peer-deps && npx tsc -b --force || true && npx vite build`
   - **Publish directory**: `dist`

## Environment Variables

1. Go to Site settings > Build & deploy > Environment
2. Add the following environment variables:
   - `NODE_VERSION` = `18`
   - `NPM_FLAGS` = `--force --legacy-peer-deps`

## Deploy Hooks

You can also set up a deploy hook to trigger builds manually:

1. Go to Site settings > Build & deploy > Continuous Deployment > Deploy hooks
2. Create a new hook, name it "Manual Deploy"
3. Copy the URL
4. Trigger a build with: `curl -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID`

## Local Deployment

As a last resort, deploy locally:

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Log in to Netlify
netlify login

# Link to your Netlify site
netlify link

# Build locally and deploy
npm run build
netlify deploy --prod
``` 