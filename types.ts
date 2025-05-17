
export interface Post {
  id: number;
  title: string;
  body: string;
  image?: string;
  username: string;
}

export interface User {
  id: number;
  username: string;
  password?: string;
  profileImage?: string;
}
