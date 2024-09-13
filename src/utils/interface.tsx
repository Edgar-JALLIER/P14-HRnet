export interface City {
  value: string;
  label: string;
  abbreviation?: string;
}

export interface Department {
  value: string;
  label: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  startDate: Date | string;
  street: string;
  city: string;
  state: City;
  zipCode: string;
  department: Department;
}

export interface UserState {
  userInfo: FormData[];
  loading: boolean;
  error: boolean;
  hasLoadedFakeData: boolean;
}

export interface RootState {
  user: UserState;
}
