import { Link } from "react-router-dom";
import SelectedButton from "../components/SelectedButton";
import { department } from "../data/department";
import { states } from "../data/city";
import CalendarDatePicker from "../components/CalendarDatePicker";
import "react-calendar/dist/Calendar.css";
import InputText from "../components/InputText";
import { useEffect, useState } from "react";
import { initialFormValues } from "../utils/initialValues";
import { FormData, RootState } from "../utils/interface";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../redux/userSlice";
import Modal from "modal-react-classico";

const HomePage = () => {
  const dispatch = useDispatch();
  const hasLoadedFakeData = useSelector(
    (state: RootState) => state.user.hasLoadedFakeData
  );
  const loading = useSelector((state) => (state as RootState).user.loading);
  const error = useSelector((state) => (state as RootState).user.error);
  const [formData, setFormData] = useState(initialFormValues);
  const [formActions, setFormActions] =
    useState<FormikHelpers<FormData> | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/fake-data.json");
        const data = await response.json();

        // Ne charge les fake-data que si elles ne sont pas déjà dans le store
        if (!hasLoadedFakeData) {
          dispatch(userSlice.actions.loadFakeData({ users: data.users }));
        }
      } catch (error) {
        dispatch(userSlice.actions.setError(true));
      }
    };
    loadData();
  }, [dispatch, hasLoadedFakeData]);

  const handleOpenModal = (
    values: FormData,
    actions: FormikHelpers<FormData>
  ) => {
    console.log("Opening modal with form data:", values);
    setFormData(values);
    setFormActions(actions);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    // Soumettre le formulaire si l'utilisateur confirme
    try {
      dispatch(userSlice.actions.setNewUser(formData));
      console.log("Form submission successful", formData);
      formActions!.resetForm();
    } catch (error) {
      console.error("Error during form submission:", error);
      dispatch(userSlice.actions.setError("Unable to submit form"));
    } finally {
      setIsOpen(false);
    }
  };

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
            handleOpenModal(values, actions);
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
              <SelectedButton name="state" options={states} />

              <InputText name="zipCode" label={"Zipcode"} />
            </fieldset>

            <label htmlFor="department">Department</label>
            <SelectedButton name="department" options={department} />
            <button type="submit">Submit</button>
            <Modal
              isOpen={isOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirm}
              title="Confirmation"
            >
              <p>Are you sure you want to submit the form?</p>
            </Modal>
            {loading && <p>Chargement ...</p>}
            {error && <p className="error-message">{error}</p>}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default HomePage;
