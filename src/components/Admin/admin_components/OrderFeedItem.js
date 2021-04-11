import React from 'react';
import {
    Container, 
    Row, 
    Col, 
    Toast,
    ToastBody
} from 'reactstrap';
const moment = require('moment');

const OrderFeedItem = (props) => {
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
                                <b>User: </b> {props.data.u_id}
                                <br />
                                <b>Genre: </b> {props.data.b_genre}
                                <br />
                                <b>Status: </b> 
                                {
                                    (props.data.o_state === 0) ? 'Returned/Cancelled' : (props.data.o_state === 1) ? 'Booked' : 'In use'
                                }
                                <br />
                                <b>Issue date: </b> {moment(props.data.iss_date).format('MMMM Do YYYY')}
                                <br />
                                <b>Return date: </b> {moment(props.data.ret_date).format('MMMM Do YYYY')}
                            </p>                            
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default OrderFeedItem;