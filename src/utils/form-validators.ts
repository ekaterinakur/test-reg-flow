import { FieldValidator, FormFieldInfo } from "../constants";
import { FormFields } from "../store";

export type FormErrors = {
	[name in keyof FormFields]: string;
}

export function validateStep(fields: FormFieldInfo[], values: FormFields): FormErrors {
	const stepErrors = {} as FormErrors;

	for(let field of fields) {
		const validationError = validateField(values[field.name], field.validators);
		if (validationError) {
			stepErrors[field.name] = validationError;
		}
	}

	return stepErrors;
}

export function validateField(value: string, validators: FieldValidator[]): string | undefined {

	for(let rule of validators) {
		const validate = getValidator(typeof rule === 'object' ? rule.name : rule);
		const error = validate(value, typeof rule === 'object' ? rule.value : undefined);

		if (error) return error;
	}
}

function getValidator(rule: string): (value: string, ...params: any) => string | undefined {
	switch(rule) {
		case 'required':
			return checkRequired;
		case 'length':
			return checkLength;
		case 'email':
			return checkEmail;
		case 'password':
			return checkPassword;
		case 'zipCode':
			return checkZipCode;
		default:
			return checkRequired;
	}
}

function checkRequired(value: string) {
	if (!value) {
		return 'This field is required';
	};
}

function checkLength(value: string, length: { min: number, max: number }) {
	if (value.length > 2 && value.length < length.min || value.length > length.max) {
		return `This field should contains from ${length.min} to ${length.max} symbols`;
	};
}

function checkEmail(value: string) {
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		return `Please enter a correct email`;
	};
}

function checkPassword(value: string) {
	if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)) {
		return 'Password should contains at least one digit, one lowercase letter, one uppercase letter and one special character';
	};
}

function checkZipCode(value: string) {
	if (!/^\d{5}$/.test(value)) {
		// only for Ukraine
		return 'The UA zip code must contain 5 digits';
	};
}
