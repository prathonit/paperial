import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
class Index extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
            <div>
                <div style={styles.banner}>
                    <h3>Connecting people to knowledge</h3>
                </div>
                <div>
                    <Jumbotron>
                        <h1 className="display-3">Paperial</h1>
                        <p className="lead">A simple yet powerful library management system, which tries to redefine how a modern library functions.</p>
                        <hr className="my-2" />
                        <p>With our review-rating system, multiple sorting, filtering and search functions and powerful recommendation system we aim to change the way people look at libraries.</p>
                        <p className="lead">
                        <Link to = '/register'><Button color="success">Learn More</Button></Link>
                        </p>
                    </Jumbotron>
                </div>
            </div>
        );
	}
}

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

export default Index;