export interface ProfileEntity {
  id: string;
  firstName: string;
  lastName: string; 
  email: string; 
  phone: string; 
  gender: string;  
  password:string;
  role:string
}

export interface UserProfileEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  role: string;
  refreshAccessToken: string;
  refreshTokenExpiryDate: Date; 
}
