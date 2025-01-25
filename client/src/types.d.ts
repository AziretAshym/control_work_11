export interface UserFields {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ICategory {
  _id: string;
  title: string;
}

export interface Item {
  _id: string;
  user: {
    username: string;
    phoneNumber: string;
  };
  title: string;
  description: string;
  price: number;
  image: string;
  category: {title: string};
}

export interface ItemMutation {
  title: string;
  description: string;
  price: number;
  image: File | null;
  category: string
}