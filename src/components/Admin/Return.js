import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AdminAgent } from '../../agent.js';
import { useAlert } from 'react-alert';

const Return = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                if (handleValidation(formData)) {
                    await AdminAgent.returnBook(formData);
                    alert.show('Return successful');
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
        if (!data.u_id || data.u_id.length < 3) {
            alert.show('Invalid userId');
            return false;
        }
        if (!data.b_id) {
            alert.show('Invalid book id');
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