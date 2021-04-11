import React from 'react';
import {
    Container, 
    Row, 
    Col, 
    Toast,
    Badge,
    ToastBody
} from 'reactstrap';

const BookFeedItem = (props) => {
    return (
        <Toast style = {{maxWidth : 1000, padding: 20, marginTop: 20}}>
            <ToastBody style = {{fontSize: 24, padding: 0, height: '100%'}}>
                <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                    <Row style = {{height : '100%'}}>
                        <Col md = '4' style = {{
                            backgroundImage: `url(${props.data.b_img})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center'
                        }}>
                            
                        </Col>
                        <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                            <div className = 'book_intro'>
                                <h4 style = {{fontFamily: 'serif'}}>{props.data.b_name}</h4>
                                <h6><i>{props.data.b_author}</i></h6>
                                {props.data.b_desc}
                            </div>
                            <hr/>
                            <br />
                            <div>
                                Genre: <Badge color = 'secondary'>{props.data.b_genre}</Badge>  
                            </div>
                            <div>
                                Availability: {props.data.b_avail ? 'Available' : 'In use'}
                            </div>  
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default BookFeedItem;