import React, { useEffect, useState } from 'react';
import {Toast, ToastBody, Spinner, Row, Col, Container } from 'reactstrap';
import { OrderAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import { IoBookOutline, IoTrophySharp } from 'react-icons/io5';

const LeaderBoard = () =>  {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const alert = useAlert();
    let i = 0;

    useEffect(async () => {
        if (isLoading) {
            try {
                setTimeout(async () => {
                    let res = await OrderAgent.getLeaderBoard();
                    setData(res.data);
                    setIsLoading(false);
                }, 3000);
            } catch (e) {
                alert.show(e.response.msg);
                setIsLoading(false);
            }
        }
    }, []);

    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <h1><IoTrophySharp />LeaderBoard</h1>
                <br />
                <hr />
                <div style = {{marginTop: 60}} hidden = {!isLoading}>
                    <center>
                        <i>
                            We rank users based on the number of books read in the past one week. <br />
                            You can also get a place in this list if you read more ;)
                        </i>
                        <br />
                        <br />
                        <Spinner color = 'success' type = 'grow' />
                        <br />
                        Loading leader-board
                    </center>
                </div>
                <div hidden = {isLoading}>
                    { data.length === 0 && (
                        <div>
                            <center>
                                <i>No leader board ranking for this week.</i>
                            </center>
                        </div>
                    )}
                    {data.map(item => (
                        <div key = '10'>
                            <Toast style = {{maxWidth : 1000, padding: 40}}>
                                <ToastBody style = {{fontSize: 24, padding: 0, height: '100%'}}>
                                    <Container fluid style = {{margin: 0, padding: 0, height: '100%'}}>
                                        <Row style = {{height : '100%'}}>
                                            <Col md = '4' style = {{
                                                backgroundImage: `url(${item.u_img})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'contain',
                                                backgroundPosition: 'center'
                                            }}>
                                                
                                            </Col>
                                            <Col md = '8' style = {{paddingTop: 10, paddingLeft: 0, fontSize: 14}}>
                                                <div className = 'book_intro'>
                                                    Rank: <h2><b><i>{++i}</i></b></h2>
                                                    Username: <h3>{item.u_name}</h3>
                                                    UserId: <h4>{item.u_id}</h4>
                                                </div>
                                                <hr/>
                                                <Row>
                                                    <Col md = '4'>
                                                        <IoBookOutline />Books read: <h4>{item.booksRead}</h4>
                                                    </Col>
                                                </Row>
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

export default LeaderBoard;