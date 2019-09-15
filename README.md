### Quick Start
**1.** `npm run install`

**2. Setup Google Cloud:**
- Create an account + project at [cloud.google.com](https://cloud.google.com)

- Install `gcloud` CLI utility from [cloud.google.com/sdk](https://cloud.google.com/sdk)

**3. Setup Firebase:**
- Create an account + project at [firebase.com](https://firebase.com) (use identical project names)

- Add credentials to `/firebase.ts` (ignored by default in [.gitignore](https://github.com/jrodl3r/ng-fire-universal/blob/master/.gitignore)):

```javascript
export const config = {
	apiKey: 'API_KEY',
	authDomain: 'APP_NAME.firebaseapp.com',
	databaseURL: 'https://APP_NAME.firebaseio.com',
	projectId: 'APP_NAME',
	storageBucket: 'APP_NAME.appspot.com',
	messagingSenderId: '123456789012'
	appId: '1:1234567890:web:1234567890'
};
```

**4.** `npm run publish`

<br>

### Commands
- `dev` » Local Angular + Firebase Development w/ HMR
- `build:ssr` » Compile Browser + Server Bundles
- `start` or `serve:ssr` » Start Production Server w/ SSR
- `test` » Start Jest Unit Testing
- `test:watch` » Start Jest in Watch Mode
- `e2e` » Launch Cypress End-to-End Testing [TODO]
- `deploy` » Start Google Cloud Platform Release
- `deploy:functions` » Start Firebase Cloud Functions Release
- `install` » Setup Project + Install Dependencies
- `preview` » Build + Start Local Server w/ SSR
- `publish` » Build + Release All (Google Cloud & Firebase)
- `ship` » Build + Deploy to Google Cloud


	_(checkout **[package.json](https://github.com/jrodl3r/ng-fire-universal/blob/master/package.json)** for more details)_
