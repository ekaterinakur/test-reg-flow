import React from 'react';
import { Stepper as StepperMui, Step, StepLabel, Box } from '@mui/material';
import { useRegistrationStore } from '../store';
import { steps } from '../constants';

function Stepper() {
	const currentStep = useRegistrationStore((state) => state.step);

	return (
		<Box sx={{ width: '100%' }} alignContent='center'>
			<StepperMui activeStep={currentStep}>
				{steps.map((step) => (
					<Step key={step.num}>
						<StepLabel>{step.label}</StepLabel>
					</Step>
				))}
			</StepperMui>
		</Box>
	);
}

export default Stepper;