import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import {
    Container, 
    Row, 
    Col, 
    Toast,
    Label,
    Form,
    ToastBody,
    Button,
    FormGroup,
    Input,
    Spinner
} from 'reactstrap';
import { ReviewAgent } from '../../../agent.js';
const moment = require('moment');
import { useAlert } from 'react-alert';
import StarRatingComponent from 'react-star-rating-component';

const OrderFeedItem = (props) => {
    let [isReviewing, setIsReviewing] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    let [formData, setFormData] = useState({o_id: props.data.o_id, rating: 0, review: ''});
    const alert = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await ReviewAgent.postReview(formData);
            alert.show('Review posted successfully');
        } catch (e) {
            alert.show(e.response.data.msg);
        }
        setIsLoading(false);
        setIsReviewing(false);
    };

    const handleInput = async (e) => {
        e.preventDefault();
        formData[e.target.name] = e.target.value;
        setFormData(formData);
    };

    const handleInputStar = (rating) => {
        formData['rating'] = rating;
        setFormData(formData);
    };

    const handleKeySubmit = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    return (
        <Toast style = {{maxWidth : 1000, padding: 10}}>
            <ToastBody style = {{fontSize: 24, padding: 0, height: '100%'}}>
                <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                    <Row style = {{height : '100%'}}>
                        <Col md = '4' style = {{
                            backgroundImage: `url(${props.data.b_img})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            maxHeight: 400
                        }}>
                            
                        </Col>
                        <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                            <div className = 'book_intro'>
                                <h4 style = {{fontFamily: 'serif'}}>{props.data.b_name}</h4>
                                <h6><i>{props.data.b_author}</i></h6>
                            </div>
                            <hr/>
                            <p>
                                <b>Status: </b> 
                                {
                                    (props.data.o_state === 0) ? 'Returned/Cancelled' : (props.data.o_state === 1) ? 'Booked' : 'In use'
                                }
                                <br />
                                <b>Issue date: </b> {moment(props.data.iss_date).format('MMMM Do YYYY')}
                                <br />
                                <b>Return date: </b> {moment(props.data.ret_date).format('MMMM Do YYYY')}
                            </p>
                            <div hidden = {!isReviewing} style = {{fontSize: 15}}>
                                <Form onKeyDown = {handleKeySubmit}>
                                    <FormGroup>
                                        <Label>Rating</Label>
                                        <div style = {{fontSize: 24}}>
                                            <StarRatingComponent
                                            name = {props.data.o_id}
                                            count = {5}
                                            edit = {true}
                                            onStarClick = {(stars) => {
                                                handleInputStar(stars);
                                            }}
                                            />
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Review</Label>
                                        <Input type="textarea" name="review" onChange = {handleInput} placeholder = 'Tell other users what you liked about this book?' />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color = 'success' onClick = {handleSubmit}>
                                            <div hidden = {isLoading}>
                                                Submit review
                                            </div>
                                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                            <Button hidden = {isReviewing} onClick = {() => setIsReviewing(true)} outline color = 'success'>Review book</Button>
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default OrderFeedItem;