import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, parse, isValid } from "date-fns";

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
    if (isValid(value)) {
      formik.setFieldValue(name, value); // Met à jour Formik avec la date sous forme d'objet Date
    }
    toggleCalendar();
  };

  return (
    <div className="calendar-input" ref={calendarRef}>
      <Field name={name}>
        {({ field }: { field: any }) => {
          const formattedValue = isValid(new Date(field.value))
            ? format(new Date(field.value), "dd/MM/yyyy")
            : "";

          return (
            <input
              {...field}
              type="text"
              onClick={() => {
                toggleCalendar();
              }}
              value={formattedValue} // Affiche la date formatée
              readOnly
            />
          );
        }}
      </Field>
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={
              isValid(new Date(formik.values[name]))
                ? new Date(formik.values[name])
                : new Date()
            } // Utilise la valeur réelle (Date) de Formik pour le calendrier
          />
        </div>
      )}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default CalendarInput;
