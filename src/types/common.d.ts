export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
}
