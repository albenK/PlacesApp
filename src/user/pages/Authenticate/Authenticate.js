import React, { useState } from 'react';
import Button from '../../../shared/components/FormElements/Button/Button';

import Card from '../../../shared/components/UIElements/Card/Card';
import useForm from '../../../shared/hooks/useForm';
import './Authenticate.css';
import { SIGN_IN_FORM_CONFIG,  NAME_CONTROL_CONFIG } from './AuthenticateFormConfig';

const Authenticate = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { getFormValues, renderFormControls, isFormValid, addControls, removeControls } = useForm(SIGN_IN_FORM_CONFIG);

    const switchAuthModeHandler = () => {
        const isLogin = !isLoginMode;
        // if we're about to be in login mode, remove the name control
        if (isLogin) {
            removeControls(['name']);
        }
        else { // else we're about to be in sign up mode, so add the name control. order should be ['name', 'emailAddress', 'password']
            addControls([NAME_CONTROL_CONFIG], [NAME_CONTROL_CONFIG.name, SIGN_IN_FORM_CONFIG.emailAddress.name, SIGN_IN_FORM_CONFIG.password.name]);
        }
        setIsLoginMode((previousValue) => !previousValue);
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

