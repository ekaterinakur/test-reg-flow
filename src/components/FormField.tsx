import React from 'react';
import { TextField } from '@mui/material';
import { FormFields } from '../store';
import { FieldValidator } from '../constants';

interface FormFieldProps {
	name: keyof FormFields;
	label: string;
	type: string;
	validators?: FieldValidator[];
	error?: string;
	value: string;
	onChange: (name: keyof FormFields, value: string, validators?: FieldValidator[]) => void;
}

function FormField({
	name,
	label,
	type,
	validators,
	error,
	value,
	onChange,
}: FormFieldProps) {

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const name = event.target.name as keyof FormFields;

		onChange(name, value, validators);
	}

  return (
    <TextField 
			id={name}
			name={name}
			label={label}
			type={type}
			error={!!error}
			helperText={error || ''}
			margin="normal"
			fullWidth
			value={value}
			onChange={onInputChange}
		/>
  );
}

export default FormField;
