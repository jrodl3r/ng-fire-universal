export interface IUser {
  active?: boolean;
  created?: Date;
  displayName: string;
  email: string;
  lastActive?: any;
  lastLogin?: any;
  photoURL: string;
  profile?: IProfile;
  uid: string;
}

export interface IProfile {
  company?: string;
  fname: string;
  lname: string;
  website?: string;
}
