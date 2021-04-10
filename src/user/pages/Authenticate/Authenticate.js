import React from 'react';
import Button from '../../../shared/components/FormElements/Button/Button';

import Card from '../../../shared/components/UIElements/Card/Card';
import useForm from '../../../shared/hooks/useForm';
import './Authenticate.css';
import { SIGN_IN_FORM_CONFIG } from './AuthenticateFormConfig';

const Authenticate = () => {
    const { getFormValues, renderFormControls, isFormValid } = useForm(SIGN_IN_FORM_CONFIG);

    const authSubmitHandler = (event) => {
        event.preventDefault(); // prevent browser from refreshing the page.
        console.log('form values are ', getFormValues());
        if (!isFormValid()) {
            return;
        }
    };

    return (
       <Card className="authentication">
           <h2>Login Required</h2>
           <hr/>
           <form onSubmit={authSubmitHandler}>
            {renderFormControls()}
            <Button type="submit" disabled={!isFormValid()} onClick={authSubmitHandler}>LOGIN</Button>
           </form>
       </Card>
    );
};

export default Authenticate;

