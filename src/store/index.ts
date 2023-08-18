import { create } from 'zustand';

interface StepState {
  step: number;
  setStep: (step: number) => void;
}

export interface FormFields {
	// first step
	firstName: string;
	lastName: string;
	email: string;
	// second step
	state: string;
	city: string;
	street: string;
	zipCode: string;
	// third step
	username: string;
	password: string;
}

interface FormState {
	form: FormFields;
  setField: (name: string, value: string) => void;
}

type RegistrationState = StepState & FormState;

type Slise<T> = (
	set: (state: object) => void,
	...rest: any[]
) => T;

export const createStepSlice: Slise<StepState> = (set, ...rest) => ({
	step: 0,
	setStep: (step: number) => set(() => ({ step })),
});

export const createFormSlice: Slise<FormState> = (set, ...rest) => ({
	form: {
		// first step
		firstName: '',
		lastName: '',
		email: '',
		// second step
		state: '',
		city: '',
		street: '',
		zipCode: '',
		// third step
		username: '',
		password: '',
	},
	
	setField: (name: string, value: string) => set((state: FormState) => ({ form: { ...state.form, [name]: value }})),
});

export const useRegistrationStore = create<RegistrationState>((...params) => ({
	...createStepSlice(...params),
	...createFormSlice(...params),
}));
