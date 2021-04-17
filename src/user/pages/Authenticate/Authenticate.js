import React, { useState } from 'react';
import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';

import Card from '../../../shared/components/UIElements/Card/Card';
import useForm from '../../../shared/hooks/useForm';
import './Authenticate.css';
import { SIGN_IN_FORM_CONFIG,  NAME_CONTROL_CONFIG } from './AuthenticateFormConfig';

const Authenticate = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { getFormControls, isFormValid, addControls, removeControls, onControlChange, onControlBlur } = useForm(SIGN_IN_FORM_CONFIG);
    const formControls = getFormControls();
    
    const switchAuthModeHandler = () => {
        const isLogin = !isLoginMode;
        // if we're about to be in login mode, remove the name control
        if (isLogin) {
            removeControls(['name']);
        }
        else { // else we're about to be in sign up mode, so add the name control.
            addControls([NAME_CONTROL_CONFIG]);
        }
        setIsLoginMode((previousValue) => !previousValue);
    };

    const authSubmitHandler = (event) => {
        event.preventDefault(); // prevent browser from refreshing the page.
        console.log('form state is ', getFormControls());
        if (!isFormValid()) {
            return;
        }
    };

    return (
       <Card className="authentication">
           <h2>{ isLoginMode ? 'Login Required' : 'Please Sign Up'}</h2>
           <hr/>
           <form onSubmit={authSubmitHandler}>
            {
                formControls.name ? (
                    <Input 
                        element={formControls.name.elementConfigs.element}
                        type={formControls.name.elementConfigs.type}
                        autoComplete={formControls.name.elementConfigs.autoComplete}
                        { ...formControls.name }
                        handleChange={onControlChange}
                        handleBlur={onControlBlur}
                    /> 
                ) : null
            }
            <Input
                element={formControls.emailAddress.elementConfigs.element}
                type={formControls.emailAddress.elementConfigs.type}
                autoComplete={formControls.emailAddress.elementConfigs.autoComplete}
                { ...formControls.emailAddress }
                handleChange={onControlChange}
                handleBlur={onControlBlur}
            />

            <Input
                element={formControls.password.elementConfigs.element}
                type={formControls.password.elementConfigs.type}
                autoComplete={formControls.password.elementConfigs.autoComplete}
                { ...formControls.password }
                handleChange={onControlChange}
                handleBlur={onControlBlur}
            />
            <Button type="submit" disabled={!isFormValid()}>{ isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button>
           </form>
           <Button inverse onClick={switchAuthModeHandler}>{isLoginMode ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOGIN'}</Button>
       </Card>
    );
};

export default Authenticate;

