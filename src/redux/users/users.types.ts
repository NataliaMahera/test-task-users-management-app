export interface ErrorDetails {
  message: string;
  code?: number;
}

export interface ErrorResponse {
  message: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  searchTerm: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  isLoading: boolean;
  error: ErrorDetails | null;
}

export type SetSearchTermPayload = {
  field: keyof UserState['searchTerm'];
  value: string;
};


