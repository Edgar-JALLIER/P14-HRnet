import React from "react";
import Select, { SingleValue } from "react-select";
import { City } from "../utils/interface";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { initialFormValues } from "../utils/initialValues";

interface ISelectedButtonProps {
  name: string;
  options: City[];
}

const SelectedButton: React.FC<ISelectedButtonProps> = ({ name, options }) => {
  const formik = useFormikContext<any>(); // Récupérer le contexte Formik

  // Gérer le changement de sélection
  const handleSelectChange = (selectedOption: SingleValue<City>) => {
    if (selectedOption === null && name === "state") {
      formik.setFieldValue(name, initialFormValues.state);
      return;
    }
    if (selectedOption === null && name === "department") {
      formik.setFieldValue(name, initialFormValues.department);
      return;
    }
    formik.setFieldValue(name, selectedOption); // Mettre à jour la valeur dans Formik
  };

  return (
    <div style={{ width: "220px" }}>
      <Field name={name}>
        {({ field }: { field: any }) => (
          <Select
            {...field}
            className="select-input"
            value={field.value}
            options={options}
            onChange={handleSelectChange}
            isClearable
          />
        )}
      </Field>
      <ErrorMessage
        name={name === "state" ? "state.value" : "department.value"}
        component="div"
        className="error-message"
      />
    </div>
  );
};

export default SelectedButton;
