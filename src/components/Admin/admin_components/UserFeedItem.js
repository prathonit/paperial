import React, {useState} from 'react';
import {
    Container,
    Toast,
    ToastBody,
    Row,
    Col,
    Spinner,
    Form,
    FormGroup,
    Button,
    Label,
    Input
} from 'reactstrap';
import { AdminAgent } from '../../../agent.js';
import { useAlert } from 'react-alert';

const OrderFeedItem = (props) => {
    const [isMailing, setIsMailing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let [formData, setFormData] = useState({u_mail: props.data.u_mail});
    const alert = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await AdminAgent.mail(formData);
            alert.show('Mail sent successfully');
        } catch (e) {
            alert.show(e.response.data.msg);
        }
        setIsLoading(false);
        setIsMailing(false);
    };

    const handleKeySubmit = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    const handleInput = async (e) => {
        e.preventDefault();
        formData[e.target.name] = e.target.value;
        setFormData(formData);
    };

    return (
        <Toast style = {{maxWidth : 1000, padding: 10, marginTop: 20, marginLeft: 20}}>
            <ToastBody style = {{fontSize: 16, padding: 0, height: '100%'}}>
                <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                <Row style = {{height : '100%'}}>
                        <Col md = '4' style = {{
                            backgroundImage: `url(${props.data.u_img})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            maxHeight: 400
                        }}>
                            
                        </Col>
                        <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                            <p>
                            <b>UserID: </b> {props.data.u_id}
                            <br />
                            <b>UserName: </b> {props.data.u_name}
                            <br />
                            <b>User Email: </b> {props.data.u_mail}
                            <br />
                            <b>User Mobile No: </b> {props.data.u_mob}
                            <br />
                            <b>User Fine: </b> {props.data.u_fine}
                            <br />
                            <b>User Role: </b> {props.data.u_role}
                            <br />
                            </p>
                            <div hidden = {!isMailing} style = {{fontSize: 15}}>
                                <Form onKeyDown = {handleKeySubmit}>
                                    <FormGroup>
                                        <Label>Subject</Label>
                                        <Input type="text" name="m_subject" onChange = {handleInput} placeholder = 'Subject of the mail' />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Body</Label>
                                        <Input type="textarea" name="m_body" onChange = {handleInput} placeholder = 'Body of the mail' />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color = 'success' onClick = {handleSubmit}>
                                            <div hidden = {isLoading}>
                                                Send Mail
                                            </div>
                                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                            <Button hidden = {isMailing} onClick = {() => setIsMailing(true)} outline color = 'success'>Mail user</Button>               
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default OrderFeedItem;