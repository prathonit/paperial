import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import { IoArrowBackSharp } from 'react-icons/io5';

const ChangePassword = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    let res = await UserAgent.changePassword(formData);
                    alert.show(res.msg);
                }
            } catch (e) {
                alert.show(e.response.data.msg);
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
        if (!data.c_pwd || data.c_pwd.length < 3) {
            alert.show('Invalid password');
            return false;
        }
        if (!data.n_pwd || data.n_pwd.length < 3) {
            alert.show('Invalid password');
            return false;
        }
        if (data.n_pwd !== data.nc_pwd) {
            alert.show('New passwords do not match');
            return false;
        }
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2>Change password</h2>
                    <br/>
                    <FormGroup>
                        <Input type="password" name="c_pwd" id="c_pwd" onChange = { handleInput } placeholder="Current password"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="n_pwd" id="n_pwd" onChange = {handleInput} placeholder="New password"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="nc_pwd" id="nc_pwd" onChange = {handleInput} placeholder="Confirm new password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit}>
                            <Spinner color = 'dark' size = 'sm' style = {{display : (isLoading) ? 'block' : 'none'}} />
                            {(!isLoading) ? 'Change password' : ''}
                        </Button>
                    </FormGroup>
                    <hr/>
                    <Link to='/home'> <IoArrowBackSharp /> Go back </Link>
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

export default ChangePassword;