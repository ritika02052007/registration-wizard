# Registration Wizard

A 3-step onboarding form (Personal info, Account details, Review and submit) built with React, react-hook-form and zod. Sprint 07 assignment.

- **Live URL:** _add your Vercel/Netlify link_
- **Demo video:** _add your link_

## Tech stack
React 18, Vite, react-hook-form, zod, @hookform/resolvers, plain CSS. One route, no backend.

## Run locally
```bash
npm install
npm run dev
```

## How state persists across steps
`RegistrationWizard.jsx` creates a single `useForm()` instance and shares it through `FormProvider`. Steps read it with `useFormContext()`. When a step unmounts, react-hook-form keeps the values in its own store (`shouldUnregister` is false), so pressing Back restores every field.

## Validation rules (defined once in `src/schemas/registrationSchema.js`)
| Field | Rule |
|---|---|
| First / last name | Required, at least 2 characters, letters (plus space, hyphen, apostrophe) |
| Date of birth | Required, valid date, not in the future, at least 18 years old |
| Email | Required, must contain `@`, must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` |
| Password | Required, at least 8 characters |
| Confirm password | Must match password |

Errors appear in real time while typing (`mode: 'onChange'`). "Next" stays disabled until the current step's schema passes (`safeParse`).

## Project structure
```
src/
  App.jsx, main.jsx, index.css
  components/  RegistrationWizard, ProgressBar, StepOne, StepTwo, StepThree,
               SuccessScreen, PasswordInput, FormField
  schemas/     registrationSchema.js
```
`FormField.jsx` is a small shared label + input + error component.

## Development phases
1. useState + lifted state + conditional rendering
2. Regex validation, disabled Next, password toggle, progress bar
3. Migration to react-hook-form + zod
