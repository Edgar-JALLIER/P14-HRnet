import { Link } from "react-router-dom";
import SelectedButton from "../components/SelectedButton";
import { department } from "../data/department";
import { states } from "../data/city";
import CalendarDatePicker from "../components/CalendarDatePicker";
import "react-calendar/dist/Calendar.css";
import InputText from "../components/InputText";
import { useEffect, useState } from "react";
import { initialFormValues } from "../utils/initialValues";
import { City, RootState } from "../utils/interface";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../redux/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => (state as RootState).user.loading);
  const error = useSelector((state) => (state as RootState).user.error);
  const [formData, setFormData] = useState(initialFormValues);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    startDate: Yup.string().required("Start date is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.object().shape({
      value: Yup.string().required("State is required"),
      label: Yup.string().required("State is required"),
      abbreviation: Yup.string().required("State is required"),
    }),
    department: Yup.object().shape({
      value: Yup.string().required("Department is required"),
      label: Yup.string().required("Department is required"),
    }),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
      .required("Zip code is required"),
  });
  useEffect(() => {
    console.log("test useeffect", formData);
  }, [formData]);
  const handleInputChange =
    (name: string) => (value: string | Date | City | null) => {
      console.log("test avant", value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container-home">
        <div className="box-center">
          <Link to="/employee" className="link-table">
            View Current Employees
          </Link>
        </div>

        <h2>Create Employee</h2>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true); // Démarre la soumission
            try {
              dispatch(userSlice.actions.setNewUser(values));
              console.log("formValues réussi", values);
              // actions.resetForm(); // Réinitialise le formulaire après une soumission réussie
            } catch (error) {
              console.error(
                "Error lors de la récupération des données:",
                error
              );
              dispatch(
                userSlice.actions.setError(
                  "Impossible de récupérer les données"
                )
              );
            } finally {
              actions.setSubmitting(false); // Réactive le bouton de soumission
            }
          }}
        >
          <Form>
            <InputText name="firstName" label={"First Name"} />

            <InputText name="lastName" label={"Last Name"} />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <CalendarDatePicker name="dateOfBirth" />

            <label htmlFor="start-date">Start Date</label>
            <CalendarDatePicker name="startDate" />

            <fieldset className="address">
              <legend>Address</legend>

              <InputText name="street" label={"Street"} />

              <InputText name="city" label={"City"} />

              <label htmlFor="state">State</label>
              <SelectedButton
                name="state"
                options={states}
                onChange={handleInputChange("state")}
              />

              <InputText name="zipCode" label={"Zipcode"} />
            </fieldset>

            <label htmlFor="department">Department</label>
            <SelectedButton
              name="department"
              options={department}
              onChange={handleInputChange("department")}
            />
            <button type="submit">Submit</button>
            {loading && <p>Chargement ...</p>}
            {error && <p className="error-message">{error}</p>}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default HomePage;
