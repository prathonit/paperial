import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import agent from '../agent.js';
import { useAlert } from 'react-alert';

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    let res = await agent('/secure/user/signup', formData, 'post');
                    localStorage.setItem('accessToken', res.data.accessToken);
                    alert.show('Registered successfully!');
                    window.location = '/home';
                }
            } catch (e) {
                alert.show(e.response.data.msg);
            }
            setIsLoading(false);
        }
    }, [isLoading]);
    const handleInput = (e) => {
        let fData = formData;
        fData[e.target.name] = e.target.value;
        setFormData(fData);
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
        if (!data.u_mail || data.u_mail.length < 3) {
            alert.show('Invalid email address');
            return false;
        }
        if (!data.u_name || data.u_name.length < 3) {
            alert.show('Invalid name');
            return false;
        }
        if (!data.u_mob || data.u_mob.length < 10) {
            alert.show('Invalid phone no');
            return false;
        }
        if (!data.u_role || data.u_role.length < 1) {
            alert.show('Please select role');
            return false;
        }
        if (!data.pwd || data.pwd.length < 3) {
            alert.show('Password too short');
            return false;
        }
        if (!data.c_pwd || data.c_pwd.length < 3 || data.pwd !== data.c_pwd) {
            alert.show('Passwords do not match');
            return false;
        }
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2>Register</h2>
                    <br/>
                    <FormGroup>
                        <Input type="email" name="u_mail" id="u_mail" onChange = {handleInput} placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="u_name" id="u_name" onChange = {handleInput} placeholder="Name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="u_mob" id="u_mob" onChange = {handleInput} placeholder="Phone number"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" name="u_role" id="u_role" onChange = {handleInput} placeholder="Select role">
                            <option value=''>Select role</option>
                            <option value='student'>Student</option>
                            <option value='faculty'>Faculty</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="pwd" id="pwd" onChange = {handleInput} placeholder="Enter a password"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="c_pwd" id="c_pwd" onChange = {handleInput} placeholder="Confirm password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit}>
                            <Spinner color = 'dark' size = 'sm' style = {{display : (isLoading) ? 'block' : 'none'}} />
                            {(!isLoading) ? 'Register' : ''}
                        </Button>
                    </FormGroup>
                    <hr/>
                    <Link to='/login'>Already have an account?</Link>
                </Form>
            </div>
                <br/>
                <br/>
                <br/>
        </div>
    );
};

let styles = {
    formContainer: {
        display: 'block',
        width: '50%',
        marginTop: 40,
        position: 'relative'
    }
};

export default Register;