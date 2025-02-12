
export type DepartmentType =
  | "CREATIVE_DEPARMENT"
  | "GOOGLE_DEPARTMENT"
  | "AUTOMATION_DEPARTMENT"
  | "BLOG_DEPARTMENT";

export type Role = "DEPARTMENT_USER";

export interface Department {
  username: string;
  email: string;
  password: string | null;
  departmentType: DepartmentType;
  role: Role;
  createdAt: string;
}

export interface DepartmentResponse {
  success: boolean;
  message: string;
  status: string;
  data: Department[];
  pageNumber: number;
  elementSize: number;
  totalPage: number;
  first: boolean;
  last: boolean;
}