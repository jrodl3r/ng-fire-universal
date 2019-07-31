import { BehaviorSubject } from 'rxjs';

const credentialsMock = {
  email: 'abc@123.com',
  password: 'password'
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null);

const mockSignInHandler = (email: any, password: any): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const mockSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

export const AngularFireAuthStub = {
  authState: fakeAuthState,
  user: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and
      .callFake(mockSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and
      .callFake(mockSignInHandler),
    signOut: jasmine
      .createSpy('signOut')
      .and
      .callFake(mockSignOutHandler),
  },
};

export const AngularFireFunctionsStub = {
  httpsCallable: (state: string) => {}
};

export const AngularFireStorageStub = {};

export const FirestoreStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({name: 'name'}),
      set: (d: any) => new Promise((resolve, reject) => resolve())
    }),
    valueChanges: () => {}
  }),
};
