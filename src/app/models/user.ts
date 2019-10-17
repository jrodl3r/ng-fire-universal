export interface IUser {
  active?: boolean;
  activity?: IUserAction[];
  created?: any;
  displayName: string;
  email: string;
  isAdmin?: boolean;
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
  phone?: string;
  website?: string;
}

export interface IUserAction {
  meta: any;
  type: string;
  timestamp: Date;
}
