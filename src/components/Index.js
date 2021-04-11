import React from 'react';

class Index extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
            <div>
                <div style={styles.banner}>
                    <h3>Where knowledge is shared</h3>
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