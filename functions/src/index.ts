import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

firebase.initializeApp();

export const addAdmin = functions.https.onCall((data, context) => {
  return firebase.auth().getUserByEmail(data.email).then(user => {
    return firebase.auth().setCustomUserClaims(user.uid, { admin: true });
  }).then(() => {
    return { message: `${data.email} is now an Admin` }
  }).catch(error => error);
});

export const removeAdmin = functions.https.onCall((data, context) => {
  return firebase.auth().getUserByEmail(data.email).then(user => {
    return firebase.auth().setCustomUserClaims(user.uid, { admin: false });
  }).then(() => {
    return { message: `${data.email} is no longer an Admin` }
  }).catch(error => error);
});
