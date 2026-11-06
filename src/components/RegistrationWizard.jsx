import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProgressBar from './ProgressBar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import SuccessScreen from './SuccessScreen';
import { registrationSchema } from '../schemas/registrationSchema';

const TOTAL_STEPS = 3;
const defaultValues = {
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ONE form instance for all steps. shouldUnregister defaults to false, so values stay
  // in RHF's store when a step unmounts: that is what makes "Back" keep the data.
  const methods = useForm({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById('step-heading')?.focus();
  }, [step]);

  const onSubmit = (data) => {
    console.log(data); // validated, trimmed payload
    setIsSubmitted(true);
  };

  // Only the final step may submit (Enter on steps 1-2 must not skip the review)
  const handleFormSubmit = (e) => {
    if (step < TOTAL_STEPS) {
      e.preventDefault();
      return;
    }
    return methods.handleSubmit(onSubmit)(e);
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    setStep(1);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <SuccessScreen firstName={methods.getValues('firstName')} onReset={handleReset} />;
  }

  return (
    <FormProvider {...methods}>
      <form className="card" onSubmit={handleFormSubmit} noValidate>
        <ProgressBar step={step} total={TOTAL_STEPS} />
        {step === 1 && <StepOne onNext={goNext} />}
        {step === 2 && <StepTwo onNext={goNext} onBack={goBack} />}
        {step === 3 && <StepThree onBack={goBack} />}
      </form>
    </FormProvider>
  );
}
