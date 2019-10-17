# Setup Firebase
To get up and running with role-based authentication and data security we'll add an admin to our Firebase project, along with the Cloud Firestore Database and Cloud Storage rules. Finally, we'll setup Firebase Performance Monitoring for insight on load times and other useful application metrics.

> [Complete the Quick Start](https://github.com/jrodl3r/ng-fire-universal/blob/master/dpcs/00-Quick_Start.md) » Then run `gcloud app browse` to verify the release.

<br>

## Create Admin
We use [Firebase Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims) to get and set role-based permissions on user accounts.

Presently, we do not have a GUI method (ex: Firebase Console settings) for managing Custom Claims on user accounts. So, we'll need to make a few small, temporary changes locally to create the initial admin account:

**1. Comment [these 2 lines](https://github.com/jrodl3r/ng-fire-universal/blob/f28156cdae6afea2bb2540639c33c734b91121fb/src/app/app-routing.module.ts#L23-L24):**
```javascript
{
  path: 'admin',
  loadChildren: () => import('./components/_admin/admin.module').then(m => m.AdminModule),
  // canActivate: [AngularFireAuthGuard],
  // data: { authGuardPipe: isAdmin }
},
```

**2. Replace [this line](https://github.com/jrodl3r/ng-fire-universal/blob/74b8837fcbb2bc7565e67b896c1919f8bb420913/src/app/components/_admin/users/users.component.html#L42):**
```javascript
[isDisabled]="isUpdating"
```

**3. Start local server:** `npm run dev`

**4. Login and navigate to Admin » Users:** `localhost:4200/admin/users`

**5. Select User and click 'Grant Admin Access' on the actions menu:**

<img src="https://ng-fire-universal.s3.amazonaws.com/img/docs/admin-01.png" width="460"><br>

**6. Uncomment the lines from _Step 1_ and revert the change from _Step 2_.**

We now have an Admin User with full control over all user accounts (except their own) via the Admin Module and we can securely, and easily control all user priviledges (Custom Claims) moving forward.

<br>

## Add Database Rules
> _Firebase Console » Database » Rules_

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

  	// Users
    match /users {
      match /{userId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }
    }

    // Items
    match /items/{document=**} {
    	allow read;
      allow write: if isAdmin();
    }

    // Functions
    function isOwner(uid) { return request.auth.uid == uid; }

    function isSignedIn() { return request.auth != null; }

    function isAdmin() { return request.auth.token.admin == true; }

    function isActiveUser(uid) {
      return get(/databases/$(database)/documents/users/$(uid)).data.active == true;
    }
  }
}
```


<br>

## Add Cloud Storage Rules
> _Firebase Console » Storage » Rules_

```javascript
service firebase.storage {
  match /b/{bucket}/o {
  	match /images {
      match /{allImages=**} {
        allow read;
      }
      match /avatars/{userId} {
        allow write: if request.auth.uid == userId
                     && request.resource.size < 300 * 1024
                     && request.resource.contentType.matches('image/.*')
      }
    }
  }
}
```

<br>

## Setup Performance Monitoring
_TBD - Work in progress_

**1. Get `measurementId`:** _Firebase Console » Project Settings » Your Apps_

**2. Add `measurementId` to `/firebase.ts` config:**

```javascript
export const config = {
  ...,
  measurementId: 'MEASUREMENT_ID'
};
```
