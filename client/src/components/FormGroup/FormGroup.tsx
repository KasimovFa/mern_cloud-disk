import React from 'react';
import './formGroup.scss';


export interface PropsFormGroup {
   componentInput: any[],
   little?: string,
   onClick: () => void
   nameForm: string,
   validForm: boolean
}


const FormGroup = ({componentInput, little,onClick, nameForm, validForm}:PropsFormGroup) => {

    let cls = ["registration_wrapper"];
    
    if (little) {
      cls = [
         "registration_wrapper", "registration-little"] 
    }

    return (
        <div className='registration'>
          <div className = {cls.join(' ')}> 
            <div className="registration__header">{nameForm}</div>
            {
                componentInput.map((Input) => (Input))
            }
              <button 
                className='registration-button' 
                disabled = {!validForm} 
                onClick={onClick}
              >
                {nameForm}
            </button>
           </div>
        </div>
    );
};

export default FormGroup;