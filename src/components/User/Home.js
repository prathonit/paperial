import React from 'react';
import {
    Container, 
    Row, 
    Col, 
    Toast, 
    ToastHeader, 
    ToastBody, 
    Button
} from 'reactstrap';
import BookFeed from './user_components/BookFeed';
import { GrFilter } from 'react-icons/gr';
import { ImSortAmountDesc } from 'react-icons/im';

const Home = () => {

    const handleFilterChangeCateg = async (e) => {
        e.preventDefault();
        localStorage.setItem('categ', e.target.value);
        window.location.reload();
    };

    const handleFilterChangeSort = async (e) => {
        e.preventDefault();
        localStorage.setItem('sort', e.target.value);
        window.location.reload();
    };

    return (
        <div>
            <div style={styles.banner}>
                <h3>Welcome user</h3>
            </div>
            <Container fluid = {true}>
                <Row>
                    <Col md = '8'>
                       <div className = 'p-2 my-2 rounded'>
                            <BookFeed categ = {localStorage.getItem('categ') || 'all'} sort = {localStorage.getItem('sort') || 'rating_dec'} />
                       </div>
                    </Col>
                    <Col md = '4'>
                        <div className="p-3 my-2 rounded">
                            <Toast>
                            <ToastHeader>
                                <GrFilter /> Filter by category
                            </ToastHeader>
                            <ToastBody style = {{fontSize: 20}} id = 'filter'>
                                <Button color = 'secondary' name = 'categ' value = 'all' onClick = {handleFilterChangeCateg}>All</Button>
                                <Button color = 'secondary' name = 'categ' value = 'fiction' onClick = {handleFilterChangeCateg}>Fiction</Button>
                                <Button color = 'secondary' name = 'categ' value = 'non_fiction' onClick = {handleFilterChangeCateg}>Non fiction</Button>
                                <Button color = 'secondary' name = 'categ' value = 'biography' onClick = {handleFilterChangeCateg}>Biography</Button>
                                <Button color = 'secondary' name = 'categ' value = 'science' onClick = {handleFilterChangeCateg}>Science</Button>
                            </ToastBody>
                            </Toast>
                        </div>
                        <div className="p-3 my-2 rounded">
                            <Toast>
                            <ToastHeader>
                                <ImSortAmountDesc /> Sort by
                            </ToastHeader>
                            <ToastBody style = {{fontSize: 20}} id = 'filter'>
                                <Button color = 'secondary' name = 'sort' value = 'rating_inc' onClick = {handleFilterChangeSort}>Rating - Increasing order</Button>
                                <Button color = 'secondary' name = 'sort' value = 'rating_dec' onClick = {handleFilterChangeSort}>Rating - Decreasing order</Button>
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