import { useFormContext } from 'react-hook-form';

export default function StepThree({ onBack }) {
  const { getValues, formState: { isSubmitting } } = useFormContext();
  const { firstName, lastName, dob, email, password } = getValues();

  const rows = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Date of birth', dob],
    ['Email', email],
    ['Password', '•'.repeat(password.length)], // never show the real password
  ];

  return (
    <section>
      <h1 id="step-heading" tabIndex={-1}>Review and submit</h1>
      <p className="hint">Check your details before you submit.</p>

      <dl className="summary">
        {rows.map(([label, value]) => (
          <div className="summary-row" key={label}>
            <dt>{label}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>

      <div className="actions">
        <button type="button" className="btn secondary" onClick={onBack}>Back</button>
        <button type="submit" className="btn primary" disabled={isSubmitting}>Submit</button>
      </div>
    </section>
  );
}
