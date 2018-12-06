import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const universal = functions.https.onRequest((request, response) => {
  require(`${process.cwd()}/dist/ng-fire-universal-webpack/server`).app(request, response);
});
