import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import {
    IoArrowBackSharp,
    IoPencilOutline,
} from 'react-icons/io5';

const Profile = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        u_name: '',
        u_mail: '',
        u_id: '',
        u_role: '',
        u_fine: 0,
        u_mob: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const alert = useAlert();

    useEffect(async () => {
        try {
            let res = await UserAgent.get({});
            setFormData(res.data);
        } catch (e) {
            alert.show('Error fetching user profile');
        }
    }, []);

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    let res = await UserAgent.update(formData);
                    alert.show(res.msg);
                    setIsEditing(false);
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
        if (!data.u_name || data.u_name.length < 3) {
            alert.show('Invalid name');
            return false;
        }
        if (!data.u_mob || data.u_mob.length < 10) {
            alert.show('Invalid phone no');
            return false;
        }
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2>Profile</h2>
                    <br/>
                    <FormGroup>
                        <Label for = 'u_mail'>Name</Label>
                        <Input type='text' name='u_name' id='u_name' onChange = {handleInput} placeholder = {formData.u_name} disabled = {!(isEditing)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for = 'u_mail'>Email</Label>
                        <Input type="text" name="u_mail" id="u_mail" onChange = {handleInput} placeholder = {formData.u_mail} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for = 'u_mail'>Phone no</Label>
                        <Input type="text" name="u_mob" id="u_mob" onChange = {handleInput} placeholder = {formData.u_mob} disabled = {!(isEditing)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for = 'u_role'>Role</Label>
                        <Input type="select" name="u_role" id="u_role" onChange = {handleInput} disabled = {!(isEditing)}>
                            <option value=''>{isEditing ? 'Select role' : formData.u_role}</option>
                            <option value='student'>Student</option>
                            <option value='faculty'>Faculty</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for = 'u_fine'>Fine</Label>
                        <Input type="text" name="u_role" id="u_fine" onChange = {handleInput} placeholder = {formData.u_fine} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit} hidden = {!isEditing}>
                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                            {(!isLoading) ? 'Submit details' : ''}
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = { () => setIsEditing(true)} hidden = {isEditing}>
                            <IoPencilOutline /> Edit profile
                        </Button>
                    </FormGroup>
                    <hr/>
                    <Link to='/home'> <IoArrowBackSharp /> Go back </Link>
                </Form>
                <br/>
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

export default Profile;