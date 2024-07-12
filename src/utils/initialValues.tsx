import { FormData } from "./interface";

export const initialFormValues: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  startDate: "",
  street: "",
  city: "",
  state: { value: "", label: "", abbreviation: "" },
  zipCode: 0,
  department: { value: "", label: "" },
};
