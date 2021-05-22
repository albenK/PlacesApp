import React, { useReducer, useContext } from 'react';

import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import Card from '../../../shared/components/UIElements/Card/Card';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useForm from '../../../shared/hooks/useForm';
import { AuthContext } from '../../../shared/context/AuthContext';

import './Authenticate.css';
import { SIGN_IN_FORM_CONFIG,  NAME_CONTROL_CONFIG } from './AuthenticateFormConfig';
import { AuthInitialState, ACTION_TYPES, AuthReducer } from './AuthReducer';

const Authenticate = () => {
    const auth = useContext(AuthContext);
    const [ state, dispatch ] = useReducer(AuthReducer, AuthInitialState);
    const { getFormControls, isFormValid, addControls, removeControls, onControlChange, onControlBlur } = useForm(SIGN_IN_FORM_CONFIG);
    const formControls = getFormControls();
    
    const switchAuthModeHandler = () => {
        const isLogin = !state.isLoginMode;
        // if we're about to be in login mode, remove the name control
        if (isLogin) {
            removeControls(['name']);
        }
        else { // else we're about to be in sign up mode, so add the name control.
            addControls([NAME_CONTROL_CONFIG]);
        }
        dispatch({ type: ACTION_TYPES.TOGGLE_LOGIN_MODE });
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault(); // prevent browser from refreshing the page.
        console.log('form state is ', formControls);
        if (!isFormValid()) {
            return;
        }

        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { isLoading: true } });
        // TODO: Make HTTP request to sign in or sign up. For now fake a login.
        if (state.isLoginMode) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formControls.emailAddress.value,
                        password: formControls.password.value
                    })
                });
                const responseData = await response.json();
                console.log('responseData is ', responseData);
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { isLoading: false } });
                auth.login();
            } catch (error) {
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { isLoading: false } });
                console.log('WE HAVE AN ERROR! ', error);
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: { error: error.message ||  'Something went wrong. Please try again later.' } });
            } 
        } else {
            // Sign Up
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formControls.name.value,
                        email: formControls.emailAddress.value,
                        password: formControls.password.value
                    })
                });
                const responseData = await response.json();
                console.log('responseData is ', responseData);
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { isLoading: false } });
                auth.login();
            } catch (error) {
                dispatch({ type: ACTION_TYPES.SET_LOADING, payload: { isLoading: false } });
                console.log('WE HAVE AN ERROR! ', error);
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: { error: error.message ||  'Something went wrong. Please try again later.' } });
            }   
        }
    };

    const errorModalCloseHandler = () => {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: { error: null } });
    };

    return (
        <React.Fragment>
            <ErrorModal error={state.error} onClear={errorModalCloseHandler}/>

            <Card className="authentication">
                {state.isLoading && <LoadingSpinner asOverlay/> }
                <h2>{ state.isLoginMode ? 'Login Required' : 'Please Sign Up'}</h2>
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
                    <Button type="submit" disabled={!isFormValid()}>{ state.isLoginMode ? 'LOGIN' : 'SIGN UP'}</Button>
                </form>
                <Button inverse onClick={switchAuthModeHandler}>{state.isLoginMode ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOGIN'}</Button>
            </Card>
        </React.Fragment>
    );
};

export default Authenticate;

