export enum Roles {
  Admin = 'Admin',
  Specialist = 'Specialist',
  Normal = 'Normal',
}

export interface User {
  id: number;
  name: string;
  surname: string;
  fullName: string;
  photoUrl: string;
  role: Roles;
  email: string;
  isApproved: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  linkToMeeting: string;
  owner: User;
  users: User[];
  comments: Comment;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  calendarId: string;
  user: User;
}
