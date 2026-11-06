import { forwardRef } from 'react';

// Label + input + error message. forwardRef lets react-hook-form's register() attach its ref in Phase 3.
const FormField = forwardRef(function FormField(
  { id, label, error, type = 'text', ...inputProps },
  ref
) {
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        ref={ref}
        type={type}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
