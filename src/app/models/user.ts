export interface IUser {
  avatar?: String;
  created?: Date;
  displayName?: String;
  email: String;
  profile?: IProfile;
  uid: String;
}

export interface IProfile {
  company?: String;
  fname?: String;
  lname?: String;
  website?: String;
}
