import React, { useState } from 'react';
import Button from '../../../shared/components/FormElements/Button/Button';

import Card from '../../../shared/components/UIElements/Card/Card';
import useForm from '../../../shared/hooks/useForm';
import './Authenticate.css';
import { SIGN_IN_FORM_CONFIG, SIGN_UP_FORM_CONFIG, NAME_CONTROL_CONFIG } from './AuthenticateFormConfig';

const Authenticate = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { getFormValues, renderFormControls, isFormValid, addControls, updateControls, removeControls, setTheForm } = useForm(SIGN_IN_FORM_CONFIG);

    const switchAuthModeHandler = () => {
        // debugger;
        const isLogin = !isLoginMode;
        console.log('isLogin is ', isLogin);
        // // if we're in login mode, remove the name control
        // if (isLogin) {
        //     removeControls(['name']);
        // }
        // else { // else we're in sign up mode, so add the name control.
        //     addControls([NAME_CONTROL_CONFIG]);
        // }
        // TODO: Think of a better way to do this!
        const formValues = getFormValues();
        const formControls = isLogin ? { 
            ...SIGN_IN_FORM_CONFIG, emailAddress: { ...SIGN_IN_FORM_CONFIG.emailAddress, value: formValues.emailAddress.value, isValid: formValues.emailAddress.isValid}, password: { ...SIGN_IN_FORM_CONFIG.password, value: formValues.password.value, isValid: formValues.password.isValid} } 
            : { 
                ...SIGN_UP_FORM_CONFIG, emailAddress: { ...SIGN_UP_FORM_CONFIG.emailAddress, value: formValues.emailAddress.value, isValid: formValues.emailAddress.isValid}, password: { ...SIGN_UP_FORM_CONFIG.password, value: formValues.password.value, isValid: formValues.password.isValid} } 
        setIsLoginMode((previousValue) => !previousValue);
        setTheForm(formControls);
    };

    const authSubmitHandler = (event) => {
        event.preventDefault(); // prevent browser from refreshing the page.
        console.log('form values are ', getFormValues());
        if (!isFormValid()) {
            return;
        }
    };

    return (
       <Card className="authentication">
           <h2>{ isLoginMode ? 'Login Required' : 'Please Sign Up'}</h2>
           <hr/>
           <form onSubmit={authSubmitHandler}>
            {renderFormControls()}
            <Button type="submit" disabled={!isFormValid()} onClick={authSubmitHandler}>{ isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button>
           </form>
           <Button inverse onClick={switchAuthModeHandler}>{isLoginMode ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOGIN'}</Button>
       </Card>
    );
};

export default Authenticate;

