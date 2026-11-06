import { z } from 'zod';

const MIN_AGE = 18;
const MIN_PASSWORD_LENGTH = 8;

const nameField = (label) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .min(2, `${label} must be at least 2 characters`)
    .regex(/^[A-Za-z][A-Za-z' -]*$/, `${label} can only contain letters`);

const parseDate = (value) => {
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

const getAge = (birth, today) => {
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
};

// Rules are defined ONCE per step, then reused for the step check and the full form.
const stepOneFields = {
  firstName: nameField('First name'),
  lastName: nameField('Last name'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((v) => !v || parseDate(v) !== null, 'Enter a valid date')
    .refine((v) => !v || !parseDate(v) || parseDate(v) <= new Date(), 'Date of birth cannot be in the future')
    .refine(
      (v) => !v || !parseDate(v) || parseDate(v) > new Date() || getAge(parseDate(v), new Date()) >= MIN_AGE,
      `You must be at least ${MIN_AGE} years old`
    ),
};

const stepTwoFields = {
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((v) => !v || v.includes('@'), 'Email must contain an @ symbol')
    .refine((v) => !v || !v.includes('@') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
};

// Cross-field rule: attach the error to confirmPassword
const passwordsMatch = [
  (data) => data.password === data.confirmPassword,
  { message: 'Passwords do not match', path: ['confirmPassword'] },
];

export const stepOneSchema = z.object(stepOneFields);
export const stepTwoSchema = z.object(stepTwoFields).refine(...passwordsMatch);
export const registrationSchema = z
  .object({ ...stepOneFields, ...stepTwoFields })
  .refine(...passwordsMatch);
