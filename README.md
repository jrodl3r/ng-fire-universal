![repo version](https://img.shields.io/badge/version-0.9.3-blueviolet)
![angular version](https://img.shields.io/badge/Angular-8.2.8-red)
![node version](https://img.shields.io/badge/node-10.15.3-green)
[![demo online](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://ng-fire.com)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)

<br>

<a href="https://ng-fire.com">
	<p><img src="https://ng-fire-universal.s3.amazonaws.com/img/feature-splash.png"></p>
</a>

> Ship [Angular](https://angular.io) + [Firebase](https://firebase.com) Apps to [Google Cloud](https://cloud.google.com) (Fast) » [ng-fire.com](https://ng-fire.com)

<br>

## What's in the box?
🔥 &nbsp;Angular Universal (SSR) on  [Google Cloud](https://cloud.google.com) w/ [App Engine](https://cloud.google.com/appengine)

🚦 &nbsp;Progressive Web App » Lighthouse 💯

🔑 &nbsp;Firebase User Auth w/ Role-Based Access

🥾 &nbsp;Bootstrap UI » MDB + Font Awesome + Toastr

🧩 &nbsp;Firebase Performance Monitoring

🧪 &nbsp;Jest Unit Testing

<br>

## Quick Start
**1. Install:** `npm run init`

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
    messagingSenderId: '123456789012',
    appId: '1:1234567890:web:1234567890'
  };
```

**4. Publish:** `npm run ship:all`

<br>

## Next Steps
**[1. Advanced Firebase Setup](https://github.com/jrodl3r/ng-fire-universal/blob/master/docs/01-Setup_Firebase.md)**

**2. Setup Environment(s) + e2e Testing**

<br>

## Commands
- `build:ssr` » Compile Browser + Server Bundles
- `deploy` » Release App (Google Cloud)
- `deploy:functions` » Release Cloud Functions (Firebase)
- **`dev`** » Local Angular + Firebase Development w/ HMR &nbsp;🛠
- `e2e` » Launch Cypress End-to-End Testing
- `init` » Setup Project + Install Dependencies
- **`preview`** » Build + Start Local Server w/ SSR &nbsp;👁
- **`ship`** » Build + Deploy App &nbsp;🚀
- `ship:all` » Build + Deploy App & Cloud Functions
- `start` or `serve:ssr` » Start Production Server w/ SSR
- **`test`** » Start Jest Unit Testing &nbsp;🧪
- `test:watch` » Start Jest in Watch Mode


	_(checkout **[package.json](https://github.com/jrodl3r/ng-fire-universal/blob/master/package.json)** for more details)_

<br>

## More Info
This is a _(functional)_ work-in-progress » Until **`v1.0.0`** many additions and changes are to be expected.

The goal is to create a minimalistic bootstrap for launching serverless PWA's w/ Angular + Firebase 🔥

**[Checkout the Roadmap for release details.](https://github.com/jrodl3r/ng-fire-universal/issues/1)**
