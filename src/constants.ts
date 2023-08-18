import { FormFields } from "./store";

export interface FormStepInfo {
	num: number;
	label: string;
}

export const steps: FormStepInfo[] = [
	{
		num: 0,
		label: 'Main',
	},
	{
		num: 1,
		label: 'Location',
	},
	{
		num: 2,
		label: 'Creds',
	},
	{
		num: 3,
		label: 'Review',
	},
];

type ValidatorWithParams = {
	name: 'length';
	value: any;
}

export type FieldValidator = 'required' | 'email' | 'password' | 'zipCode' | ValidatorWithParams;

export interface FormFieldInfo {
	name: keyof FormFields;
	type: string;
	label: string;
	validators: FieldValidator[],	
	step: number,
}

export const formFields: FormFieldInfo[] = [
	{
		name: 'firstName',
		type: 'text',
		label: "First Name",
		validators: ['required', { name: 'length', value: { min: 2, max: 10 }}],	
		step: 0,
	},
	{
		name: 'lastName',
		type: 'text',
		label: "Last Name",
		validators: ['required', { name: 'length', value: { min: 2, max: 10 }}],
		step: 0,
	},
	{
		name: 'email',
		type: 'email',
		label: "Email",
		validators: ['required', 'email'],	
		step: 0,
	},
	{
		name: 'state',
		type: 'text',
		label: "State",
		validators: ['required', { name: 'length', value: { min: 2, max: 20 }}],	
		step: 1,
	},
	{
		name: 'city',
		type: 'text',
		label: "City",
		validators: ['required', { name: 'length', value: { min: 2, max: 20 }}],	
		step: 1,
	},
	{
		name: 'street',
		type: 'text',
		label: "Street",
		validators: ['required', { name: 'length', value: { min: 2, max: 50 }}],	
		step: 1,
	},
	{
		name: 'zipCode',
		type: 'text',
		label: "ZipCode",
		validators: ['required', 'zipCode'],	
		step: 1,
	},
	{
		name: 'username',
		type: 'text',
		label: "Username",
		validators: ['required', { name: 'length', value: { min: 2, max: 10 }}],
		step: 2,
	},
	{
		name: 'password',
		type: 'password',
		label: "Password",
		validators: ['required', 'password'],	
		step: 2,
	},
];
