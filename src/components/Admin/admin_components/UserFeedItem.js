import React from 'react';
import {
    Container,
    Toast,
    ToastBody,
    Row,
    Col
} from 'reactstrap';

const OrderFeedItem = (props) => {
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
                        </Col>
                    </Row>
                </Container>
            </ToastBody>
        </Toast>
    );
};

export default OrderFeedItem;