import { ErrorMessage, Field, FieldProps } from "formik";

interface IInputNumber {
  name: string;
  label: string;
}

const InputNumber: React.FC<IInputNumber> = ({ name, label }) => {
  return (
    <>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <label htmlFor={name}>{label}</label>
            <input id={name} type="number" {...field} />
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error-message" />
    </>
  );
};
export default InputNumber;
