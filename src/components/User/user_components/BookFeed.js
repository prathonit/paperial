import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container, 
    Row, 
    Col, 
    Toast,
    Badge,
    // ToastHeader, 
    ToastBody,
    Button
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
// import { GrFilter } from 'react-icons/gr';

const BookFeed = (props) => {
    return (
        <Toast style = {{maxWidth : 1000, height: 300}}>
            <ToastBody style = {{fontSize: 24, padding: 0, height: '100%'}}>
                <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                    <Row style = {{height : '100%'}}>
                        <Col md = '4'>
                            <img style = {{margin: 0, height: '100%', width: '100%'}} src = {props.data.b_img} />
                        </Col>
                        <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                            <div className = 'book_intro' style = {{minHeight: 120, maxHeight: 120}}>
                                <h4 style = {{fontFamily: 'serif'}}>{props.data.b_name}</h4>
                                <h6><i>{props.data.b_author}</i></h6>
                                {props.data.b_desc}
                            </div>
                            <hr/>
                            <Row>
                                <Col md = '4'>
                                    Availability: {props.data.b_avail}
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
                                        name="rate1"
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
                            <Link to = {`/book/${props.data.b_id}`}><Button outline color = 'success'>Explore</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default BookFeed;