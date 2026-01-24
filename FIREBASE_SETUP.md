# Firebase Deployment Setup

Your website is now configured for Firebase Hosting with automatic GitHub Actions deployment.

## Setup Instructions

### 1. **Generate Firebase Service Account Key**

You need to create a service account for GitHub Actions authentication:

```bash
# Go to Firebase Console
# Project Settings → Service Accounts → Generate new private key
# Download the JSON file and save it locally
```

### 2. **Add GitHub Secret**

1. Go to your GitHub repo: `https://github.com/devpatel22112004/teamviolence`
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the entire contents of the Firebase service account JSON file
6. Click "Add secret"

### 3. **Deploy**

Once the secret is added, any push to `main` branch will automatically:
- ✅ Checkout code
- ✅ Install dependencies
- ✅ Build the React app (`npm run build`)
- ✅ Deploy to Firebase Hosting
- ✅ Go live at: `https://teamviolence-14b67.web.app`

### 4. **Monitor Deployments**

- Go to your repo's "Actions" tab to see deployment status
- Firebase Console → Hosting to see deployment history

## Files Created

- `.firebaserc` - Firebase project configuration
- `firebase.json` - Hosting configuration
- `.github/workflows/firebase-deploy.yml` - GitHub Actions workflow

## What Happens on Each Push to Main

1. GitHub Actions automatically triggers
2. Installs all dependencies (root + client)
3. Builds the production bundle
4. Deploys to Firebase Hosting
5. Your site updates automatically!

**No manual deployment needed anymore!** 🚀
