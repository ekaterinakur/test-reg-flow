import React from 'react';
import { useRegistrationStore } from './store';
import './App.css';
import Stepper from './components/Stepper';
import Step from './components/Step';
import Success from './components/Success';

function App() {
	const currentStep = useRegistrationStore((state) => state.step);

  return (
    <div className="container">
      {currentStep !== 4 && (
        <header>
          <h1>Registration</h1>

          <Stepper />
        </header>
      )}

			<main>
        {currentStep === 4 
          ? <Success />
          : <Step />
        }
			</main>
    </div>
  );
}

export default App;
