export interface IUser {
  id: string;
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
}