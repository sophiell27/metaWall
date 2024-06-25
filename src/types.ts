export interface IUser {
  username: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
  gender?: 'male' | 'female';
  imageUrl?: string;
}

export interface IPost {
  user: {
    username: string;
    _id: string;
    imageUrl: string;
    createdAt: Date;
  };
  content: string;
  imageUrl?: string;
  createdAt: Date;
  _id: string;
}
