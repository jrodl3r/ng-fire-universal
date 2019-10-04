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
