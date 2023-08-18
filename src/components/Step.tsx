import React, { useMemo, useState } from 'react';
import { FieldValidator, formFields } from '../constants';
import { FormFields, useRegistrationStore } from '../store';
import { FormErrors, validateField, validateStep } from '../utils/form-validators';
import FormField from './FormField';
import { Button } from '@mui/material';
import ReviewInfo from './ReviewInfo';

function Step() {
	const currentStep = useRegistrationStore((state) => state.step);
	const setField = useRegistrationStore((state) => state.setField);
	const setStep = useRegistrationStore((state) => state.setStep);
	const formState = useRegistrationStore((state) => state.form);

	const [stepErrors, setStepErrors] = useState({} as FormErrors);

	const stepFields = useMemo(() => {
		return formFields.filter(field => field.step === currentStep);
	}, [currentStep]);

	const onInputChange = (name: keyof FormFields, value: string, validators?: FieldValidator[]) => {
		const validationError = validators
			? validateField(value, validators)
			: null;

		if (validationError) {
			setStepErrors({ ...stepErrors, [name]: validationError });
		} else if (stepErrors[name]) {
			setStepErrors({ ...stepErrors, [name]: undefined });
		}

		setField(name, value);
	};

  const onNextClick = () => {
		const validationRes = validateStep(stepFields, formState);

		if (validationRes && Object.keys(validationRes).length) {
			setStepErrors(validationRes);
			return;
		}

    if (currentStep !== 3) {
      setStep(currentStep + 1);
      return;
    }

		// here should be some API call for submitting
    setStep(4);
  }

  return (
    <form className='form'>
			{currentStep === 3
				? <ReviewInfo />
				: <>
						{stepFields.map(field => (
							<FormField
								key={field.name}
								name={field.name as keyof FormFields}
								label={field.label}
								type={field.type}
								validators={field.validators}
								error={stepErrors[field.name]}
								value={formState[field.name as keyof FormFields]}
								onChange={onInputChange}
							/>
						))}
					</>
			}

			<div className='form-actions'>
				{currentStep !== 0 && 
					<Button
						onClick={() => setStep(currentStep - 1)}
						className='mt-3'
					>Prev step</Button>
				}

        <Button
					type='button'
					onClick={onNextClick}
					className='ml-auto'
				>
					{currentStep === 3 ? 'Submit' : 'Next step'}
				</Button>
      </div>
    </form>
  );
}

export default Step;
