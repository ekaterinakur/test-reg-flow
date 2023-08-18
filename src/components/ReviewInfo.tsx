import React from 'react';
import { useRegistrationStore } from '../store';
import { formFields } from '../constants';
import { Box } from '@mui/system';
import { List, ListItem } from '@mui/material';

export interface StepProps {
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ReviewInfo() {
	const formState = useRegistrationStore((state) => state.form);

  return (
    <Box sx={{ width: '100%' }} >
			<List className='form-review-list'>
				{/* TODO Password shouldn`t be shown */}
				{formFields.map(field => (
					<ListItem className='form-review-item' key={field.name}>
						<span className='form-review-field'>{field.label}:</span>
						<span className='form-review-value'>{formState[field.name]}</span>
					</ListItem>
				))}
			</List>
		</Box>
  );
}

export default ReviewInfo;
