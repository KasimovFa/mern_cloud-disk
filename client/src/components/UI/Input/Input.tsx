import React from 'react';
import './input.scss';

export interface PropsInput{ 
  type: string,
  placeholder: string,
  value: string,
  onChange: (e?:any) => void
  touched:boolean,
  valid:boolean,
  errorMessage?: string
}
  


const Input = ({type, placeholder, value, onChange, touched, valid, errorMessage}:PropsInput) => {
  let cls = ["input"];
   
  if (!valid && touched) {
    cls = [
      "input",
       "input-error"
    ];
  }

   return (
         <>
           <input
              className={cls.join(' ')}
              type={type}
              placeholder={placeholder}
              value = {value}
              onChange = {onChange}    
           />  
           {(!valid && touched)? <span style ={{color:'red', fontSize: "20px",fontWeight: "bold"}}>{errorMessage}</span> : null}
         </>
    );
};

export default Input;