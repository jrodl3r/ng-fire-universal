## Quick Start

**1.** Run `npm i && npm i -g firebase-tools`

**2.** Setup Google Cloud:
- Create account + project at [cloud.google.com](https://cloud.google.com)

- Install `gcloud` CLI utility at [cloud.google.com/sdk](https://cloud.google.com/sdk)

- Deploy  `npm run build:ssr && npm run deploy`

**3.** Setup Firebase:
- Create account + new project at [firebase.com](https://firebase.com) (name identical to gCloud project)

- Copy credentials to `/firebase.ts` (ignored by default in [.gitignore](https://github.com/jrodl3r/ng-fire-universal/blob/master/.gitignore)):

	```
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

- Deploy `npm run init:functions && npm run deploy:functions`
