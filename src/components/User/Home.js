import React from 'react';
import {
    Container, 
    Row, 
    Col, 
    Toast, 
    ToastHeader, 
    ToastBody, 
    Badge
} from 'reactstrap';
import BookFeed from './user_components/BookFeed';
import { GrFilter } from 'react-icons/gr';
import { ImSortAmountDesc } from 'react-icons/im';

const Home = () => {
    return (
        <div>
            <div style={styles.banner}>
                <h3>Welcome user</h3>
            </div>
            <Container fluid = {true}>
                <Row>
                    <Col md = '8'>
                       <div className = 'p-2 my-2 rounded'>
                            <BookFeed />
                       </div>
                    </Col>
                    <Col md = '4'>
                        <div className="p-3 my-2 rounded">
                            <Toast>
                            <ToastHeader>
                                <GrFilter /> Filter by category
                            </ToastHeader>
                            <ToastBody style = {{fontSize: 20}}>
                                <Badge color = 'secondary'>Fiction</Badge>
                                <Badge color = 'secondary'>Fiction</Badge>
                                <Badge color = 'secondary'>Fiction</Badge>
                            </ToastBody>
                            </Toast>
                        </div>
                        <div className="p-3 my-2 rounded">
                            <Toast>
                            <ToastHeader>
                                <ImSortAmountDesc /> Sort by
                            </ToastHeader>
                            <ToastBody style = {{fontSize: 20}}>
                                <Badge color = 'secondary'>Rating</Badge>
                                <Badge color = 'secondary'>Reads</Badge>
                                <Badge color = 'secondary'>Fiction</Badge>
                            </ToastBody>
                            </Toast>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

let styles = {
    banner: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
        padding: 30,
        backgroundColor: '#5cb85c',
        boxShadow: 'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)'
    }
};

export default Home;