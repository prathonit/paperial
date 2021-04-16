import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Toast, ToastBody, Spinner, Button, Row, Col, Badge, Container } from 'reactstrap';
import { BookAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import {FaMagic} from 'react-icons/fa';

const Magic = () =>  {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const alert = useAlert();

    useEffect(async () => {
        if (isLoading) {
            try {
                setTimeout(async () => {
                    let res = await BookAgent.getRecommendations();
                    setData(res.data);
                    setIsLoading(false);
                }, 4000);
            } catch (e) {
                alert.show(e.response.data.msg);
                setIsLoading(false);
            }
        }
    }, []);

    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <h1><FaMagic />Recommendations</h1>
                <br />
                <hr />
                <div style = {{marginTop: 60}} hidden = {!isLoading}>
                    <center>
                        <i>
                            We consider multiple data points like your read history, reading habits, <br />
                            book ratings and other users&#39; history to serve you recommendations.
                        </i>
                        <br />
                        <br />
                        <Spinner color = 'success' type = 'grow' />
                        <br />
                        Crunching data to get you suggestions.
                    </center>
                </div>
                <div hidden = {isLoading}>
                    { data.length === 0 && (
                        <div>
                            <center>
                                <i>No recommendations for you right now. Read some books to help us understand your taste.</i>
                            </center>
                        </div>
                    )}
                    {data.map(item => (
                        <div key = '10'>
                            <Toast style = {{maxWidth : 1000, padding: 20}}>
                                <ToastBody style = {{fontSize: 24, padding: 0, height: '100%'}}>
                                    <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                                        <Row style = {{height : '100%'}}>
                                            <Col md = '4' style = {{
                                                backgroundImage: `url(${item.b_img})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center'
                                            }}>
                                                
                                            </Col>
                                            <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                                                <div className = 'book_intro' style = {{minHeight: 120, maxHeight: 120}}>
                                                    <h4 style = {{fontFamily: 'serif'}}>{item.b_name}</h4>
                                                    <h6><i>{item.b_author}</i></h6>
                                                    {item.b_desc}
                                                </div>
                                                <hr/>
                                                <Row>
                                                    <Col md = '4'>
                                                        Genre: <Badge color = 'secondary'>{item.b_genre}</Badge>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Link to = {`/book/${item.b_id}`}><Button outline color = 'success'>Explore</Button></Link>
                                            </Col>
                                        </Row>
                                    </Container>
                                </ToastBody>
                            </Toast>
                            <br />
                        </div>
                    ))}
                </div>
                <br/>
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

export default Magic;