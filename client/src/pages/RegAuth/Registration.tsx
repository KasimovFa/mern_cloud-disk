import React, { useEffect, useState } from 'react';
import { registration } from '../../api/UserApi';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/UI/Input/Input';
import { validation } from '../../utils/validator';

const Registration = () => {
    

    const [validForm, setValidForm] = useState(false);
      
    const [email, setValidEmail] = useState({
        value:'',
        touched:false,
        valid:false
    });

    const [password, setValidPass] = useState({
        value:'',
        touched:false,
        valid:false
    });

    function onChangeEmail(e:any) {
        let valid = false;
        if (validation('email', email.value)) {
            valid = true
        }
        setValidEmail(prev => {
            return {
                ...prev,
                value:e.target.value,
                touched:true,
                valid
            }
        })
    }

    function onChangePass(e:any) {
        let valid = false;
        if (validation('password', password.value)) {
            valid = true
        }
        setValidPass(prev => {
            return {
                ...prev,
                value:e.target.value,
                touched:true,
                valid
            }
        })
    }



    useEffect(() => {
      if (email.valid && password.valid) {
          setValidForm(true)
      }
    },[email, password])
    

    const componentInput = [
          <Input
               key={1}
              type = {"email"}
               placeholder = {"Введите почту"}
               onChange = {onChangeEmail}
               touched = {email.touched}
               valid = {email.valid}
               value = {email.value}
               errorMessage = {'Email невалидный'} 
           />,

           <Input
               key={2}
               type = {"password"}
               placeholder = {"Введите пароль"}
               onChange = {onChangePass}
               touched = {password.touched}
               valid = {password.valid}
               value = {password.value}
               errorMessage = {'Пароль невалидный'}
            />
    ]


    function regisUser() {
        registration(email.value, password.value).then((data) => console.log(data))
    }
    
    
    return (
        <>
         <FormGroup 
            componentInput = {componentInput} 
            nameForm = 'Регистрация'
            little = {"little"}
            validForm = {validForm}
            onClick={regisUser}
         />
        </>

    );
};

export default Registration;