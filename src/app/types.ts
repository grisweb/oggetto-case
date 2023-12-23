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
