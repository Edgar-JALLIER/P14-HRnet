import { FormData } from "./interface";

export const initialFormValues: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  startDate: "",
  street: "",
  city: "",
  state: { value: "", label: "", abbreviation: "" },
  zipCode: "",
  department: { value: "", label: "" },
};
