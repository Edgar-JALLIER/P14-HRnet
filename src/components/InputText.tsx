import { ErrorMessage, Field, FieldProps } from "formik";

interface IInputText {
  name: string;
  label: string;
}

const InputText: React.FC<IInputText> = ({ name, label }) => {
  return (
    <>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <label htmlFor={name}>{label}</label>
            <input id={name} type="text" {...field} />
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error-message" />
    </>
  );
};
export default InputText;
