import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthAgent } from '../../agent.js';
import { useAlert } from 'react-alert';

const Return = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    let res = await AuthAgent.loginUser(formData);
                    localStorage.setItem('accessToken', res.data.accessToken);
                    alert.show('Logged in successfully');
                    window.location = '/home';
                }
            } catch (e) {
                alert.show('Incorrect username/password');
            }
            setIsLoading(false);
        }
    }, [isLoading]);
    const handleInput = (e) => {
        formData[e.target.name] = e.target.value;
        setFormData(formData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };
    const handleKeySubmit = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };
    const handleValidation = (data) => {
        if (!data.u_id || data.u_id.length < 3) {
            alert.show('Invalid username');
            return false;
        }
        if (!data.pwd || data.pwd.length < 3) {
            alert.show('Invalid password');
            return false;
        }
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2>Return</h2>
                    <br/>
                    <FormGroup>
                        <Input type="text" name="u_id" onChange = { handleInput } placeholder="UserId"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="b_id" onChange = {handleInput} placeholder="BookId"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit}>
                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                            {(!isLoading) ? 'Return' : ''}
                        </Button>
                    </FormGroup>
                    <hr/>
                    <Link to='/admin/checkout'>Checkout instead</Link>
                </Form>
            </div>
        </div>
    );
};

let styles = {
    formContainer: {
        width: '50%',
        marginTop: 40
    }
};

export default Return;