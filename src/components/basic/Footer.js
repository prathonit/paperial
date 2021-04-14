import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div style = {styles.footer}>
                Find the project on: <a href = 'https://github.com/prathonit/paperial'>Github</a>
                <br />
                <p>Paperial &copy; 2021</p>
                <br />
            </div>);
    }
}

let styles = {
    footer: {
        position: 'relative',
        clear: 'both',
        bottom: 0,
        backgroundColor: '#20232a',
        padding: 10,
        color: 'white',
        textAlign: 'center',
        marginTop: 'auto',
        height: 100,
        boxShadow: 'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)'
    }
};

export default Footer;