import React, { useEffect, useState } from 'react';
import { login} from '../../api/UserApi';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { validation } from '../../utils/validator';

const AuthPage = () => {
    const {currentUsers} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
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

    const [validForm, setValidForm] = useState(false);

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
             errorMessage = {'Email не валидный'} 
         />,
        <Input
            key={2}
            type = {"password"}
            placeholder = {"Введите пароль"}
            onChange = {onChangePass}
            touched = {password.touched}
            valid = {password.valid}
            value = {password.value}
            errorMessage = {'Пароль не валидный'}
      />
    ]

    function AuthUser() {
        dispatch(login(email.value, password.value));
    }

    return (
        <div>
           <FormGroup
             componentInput = {componentInput} 
             nameForm= "Авторизация"
             little = {"little"}
             validForm = {validForm}
             onClick={AuthUser}
         /> 
        </div>
    );
};

export default AuthPage;