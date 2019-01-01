# NgFireUniversal ![Image](../master/src/favicon.ico?raw=true)

_NgFireUniversal is a baseline for building Proressive Web Apps with Angular and Firebase._

- [Demo](https://ng-fire-universal.firebaseapp.com)
- [Roadmap](https://github.com/jrodl3r/ng-fire-universal/issues/1)

<br>

```
Angular Universal + Firebase + PWA = NgFireUniversal [graphic]
```

<br>

## Features

⇢ Server-Side Rendering w/ Angular Universal<br>
⇢ Progressive Web App w/ NGSW » Lighthouse Score: 💯<br>
⇢ Firebase User Authorization (OAuth / Google + Email / Password)<br>
⇢ Firebase Cloud Storage<br>
⇢ Role-Based User Administration<br>
⇢ Core Strategies & Concepts (Lazy-Loading Routes + Modules, Auth Guards, etc.)<br>
⇢ Core Services Modules (Auth, SEO, Notifications, Forms, Settings + More)<br>
⇢ Bootstrap + MDB + Font Awesome + Toastr (Lite + No jQuery)

<br>

## Quick Start

**1.  Installation:**
```
> git clone https://github.com/jrodl3r/ng-fire-universal.git && cd ng-fire-universal
> npm install && cd functions && npm install && cd .. && npm run init
> npm install -g firebase-tools
```

**2.  Create [Firebase](https://firebase.google.com) project + Add credentials to `environment.ts` + `environment.prod.ts`:**
```javascript
export const environment = {
  ...,
  firebase: {
    apiKey: 'API_KEY',
    authDomain: 'APP_NAME.firebaseapp.com',
    databaseURL: 'https://APP_NAME.firebaseio.com',
    projectId: 'APP_NAME',
    storageBucket: 'APP_NAME.appspot.com',
    messagingSenderId: '123456789012'
  }
};
```

**3.  Enable Firebase services (Email + Google Auth, Database, Storage, Hosting & Functions)**

**4.  Start (Local Development):**
```
> npm run start
```

<br>

## Release Process

- Simulating Production Environment [...]
- Continuous Integration + Staging Deployment [...]
- Production Deployment [...]

<br>

## Build Scripts

- `npm init` - Install dependencies + setup directory structure
- `npm run start` - Local Angular + Firebase development (w/ HMR + Live-Reloading)
- `npm run start:ssr` - Local development w/ Node Server running inside a cloud function
- `npm run build` - [...]
- [...]
