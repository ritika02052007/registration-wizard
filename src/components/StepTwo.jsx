import { useFormContext, useWatch } from 'react-hook-form';
import FormField from './FormField';
import PasswordInput from './PasswordInput';
import { stepTwoSchema } from '../schemas/registrationSchema';

export default function StepTwo({ onNext, onBack }) {
  const { register, trigger, getValues, formState: { errors } } = useFormContext();

  const values = useWatch();
  const isValid = stepTwoSchema.safeParse(values).success;

  // When the password changes, re-check "confirm password" (only if the user already typed it)
  const passwordField = register('password', {
    onChange: () => {
      if (getValues('confirmPassword')) trigger('confirmPassword');
    },
  });

  return (
    <section>
      <h1 id="step-heading" tabIndex={-1}>Account details</h1>
      <p className="hint">You’ll use these to sign in.</p>

      <FormField id="email" label="Email" type="email" autoComplete="email"
        {...register('email')} error={errors.email?.message} />
      <PasswordInput id="password" label="Password" autoComplete="new-password"
        {...passwordField} error={errors.password?.message} />
      <PasswordInput id="confirmPassword" label="Confirm password" autoComplete="new-password"
        {...register('confirmPassword')} error={errors.confirmPassword?.message} />

      <div className="actions">
        <button type="button" className="btn secondary" onClick={onBack}>Back</button>
        <button type="button" className="btn primary" onClick={onNext} disabled={!isValid}>
          Next
        </button>
      </div>
    </section>
  );
}
