import React, { useState } from "react";
import Select, { ValueType } from "react-select";
import { City } from "../utils/interface";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { initialFormValues } from "../utils/initialValues";

interface ISelectedButtonProps {
  name: string;
  options: City[];
  onChange: (value: City | null) => void;
}

const SelectedButton: React.FC<ISelectedButtonProps> = ({
  name,
  options,
  onChange,
}) => {
  const formik = useFormikContext<any>(); // Récupérer le contexte Formik

  // Gérer le changement de sélection
  const handleSelectChange = (
    selectedOption: ValueType<{ value: string; label: string }, false>
  ) => {
    if (selectedOption === null && name === "state") {
      onChange(initialFormValues.state);
      formik.setFieldValue(name, initialFormValues.state);
      return;
    }
    if (selectedOption === null && name === "department") {
      onChange(initialFormValues.department);
      formik.setFieldValue(name, initialFormValues.department);
      return;
    }
    onChange(selectedOption);
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
