
export interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  plan: string;
  role: string;
}
