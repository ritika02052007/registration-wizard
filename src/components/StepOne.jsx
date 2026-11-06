import { useFormContext, useWatch } from 'react-hook-form';
import FormField from './FormField';
import { stepOneSchema } from '../schemas/registrationSchema';

export default function StepOne({ onNext }) {
  const { register, formState: { errors } } = useFormContext();

  // Watching here re-renders only this step, not the whole wizard.
  const values = useWatch();
  const isValid = stepOneSchema.safeParse(values).success;

  return (
    <section>
      <h1 id="step-heading" tabIndex={-1}>Personal info</h1>
      <p className="hint">Tell us a little about you.</p>

      <FormField id="firstName" label="First name" autoComplete="given-name"
        {...register('firstName')} error={errors.firstName?.message} />
      <FormField id="lastName" label="Last name" autoComplete="family-name"
        {...register('lastName')} error={errors.lastName?.message} />
      <FormField id="dob" label="Date of birth" type="date" autoComplete="bday"
        {...register('dob')} error={errors.dob?.message} />

      <div className="actions">
        <button type="button" className="btn primary" onClick={onNext} disabled={!isValid}>
          Next
        </button>
      </div>
    </section>
  );
}
