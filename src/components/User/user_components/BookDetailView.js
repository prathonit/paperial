import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, 
    Row, 
    Col, 
    Toast,
    Badge,
    ToastBody,
    Button
} from 'reactstrap';
import ReviewFeed from './ReviewFeed';
import CartView from './CartView.js';
import StarRatingComponent from 'react-star-rating-component';
import {
    IoArrowBackSharp
} from 'react-icons/io5';

const BookDetailView = (props) => {
    let [isOrdering, setIsOrdering] = useState(false);
    return (
        <Toast style = {{maxWidth : '90%', padding: 10}}>
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
                            <div className = 'book_intro' style = {{minHeight: 120}}>
                                <h4 style = {{fontFamily: 'serif'}}>{props.data.b_name}</h4>
                                <h6><i>{props.data.b_author}</i></h6>
                                {props.data.b_desc}
                            </div>
                            <hr/>
                            <Row>
                                <Col md = '4'>
                                    Availability: {props.data.b_avail ? 'Available' : 'In use'}
                                </Col>
                                |
                                <Col md = '4'>
                                    Genre: <Badge color = 'secondary'>{props.data.b_genre}</Badge>
                                </Col>
                            </Row>
                            <Row>
                                <Col md = '4'>
                                    <div style = {{fontSize: 25}}>
                                    <StarRatingComponent
                                        name= {props.b_id}
                                        editing= {false}
                                        starCount={5}
                                        value={props.data.b_rating}
                                    />
                                    </div>
                                </Col>
                                <span style = {{paddingTop: 9}}>|</span>
                                <Col md = '4' style = {{paddingTop: 9}}>
                                    {props.data.b_review_count} reviews
                                </Col>
                            </Row>
                            <div hidden = {isOrdering}>
                                <Button outline color = 'success' onClick = { () => setIsOrdering(true)}>Rent</Button>
                            </div>
                            <div hidden = {!isOrdering}>
                                <CartView b_id = {props.b_id} />
                                <Link onClick = {() => setIsOrdering(false)}><IoArrowBackSharp /> Cancel order </Link>
                            </div>
                            <hr/>
                            <br />
                            <h4>Reviews</h4>
                            <ReviewFeed b_id = {props.b_id} />
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default BookDetailView;