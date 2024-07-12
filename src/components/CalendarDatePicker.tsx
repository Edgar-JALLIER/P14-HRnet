import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isValid } from "date-fns";

const CalendarInput: React.FC<{ name: string }> = ({ name }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const formik = useFormikContext();
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Fermer le calendrier si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (value: Date) => {
    const formattedDate = isValid(value) ? format(value, "dd/MM/yyyy") : "";

    console.log("Date sélectionnée formatée :", formattedDate);

    formik.setFieldValue(name, formattedDate); // Mettre à jour la valeur dans Formik avec la date formatée
    toggleCalendar();
  };

  return (
    <div className="calendar-input" ref={calendarRef}>
      <Field name={name}>
        {({ field }: { field: any }) => (
          <input
            {...field}
            type="text"
            onClick={() => {
              toggleCalendar();
            }}
            value={field.value}
            readOnly
          />
        )}
      </Field>
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={
              isValid(new Date(formik.values[name]))
                ? new Date(formik.values[name])
                : format(new Date(), "dd/MM/yyyy")
            } // Accès aux valeurs via formik.values
          />
        </div>
      )}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default CalendarInput;
