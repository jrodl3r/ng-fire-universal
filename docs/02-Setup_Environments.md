# Setup Environment(s)
_TBD - Work in progress_

<br>

## Setup Project

**1.** Search and replace 'ng-fire-universal' with your `PROJECT_ID`.

**2.** Update meta details in [package.json](https://github.com/jrodl3r/ng-fire-universal/blob/master/package.json), [manifest.webmanifest](https://github.com/jrodl3r/ng-fire-universal/blob/master/src/manifest.webmanifest), [index.html](https://github.com/jrodl3r/ng-fire-universal/blob/master/src/index.html) and [seo.service.ts](https://github.com/jrodl3r/ng-fire-universal/blob/master/src/app/services/seo.service.ts).

**3.** Add `--project=PROJECT_ID` flag to `deploy` commands in [package.json](https://github.com/jrodl3r/ng-fire-universal/blob/master/package.json):
```javascript
"deploy": "gcloud app deploy --project=GCLOUD_PROJECT_ID",
"deploy:functions": "firebase deploy --only functions --project=FIREBASE_PROJECT_ID",
```

<br>

## Setup Production Environment

_TBD_
