import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import {
    IoArrowBackSharp,
    IoSearchOutline
} from 'react-icons/io5';

const Profile = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    let res = await UserAgent.update(formData);
                    alert.show(res.msg);
                }
            } catch (e) {
                alert.show(e.response.msg);
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
                    <h2><IoSearchOutline /> Search</h2>
                    <br/>
                    <FormGroup>
                        <Input type='text' name='search_query' id='search_query' onChange = {handleInput} placeholder = 'Start typing ...' />
                    </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit}>
                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                            {(!isLoading) ? 'Search' : ''}
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