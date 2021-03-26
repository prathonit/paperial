import React from 'react';
import { useAlert } from 'react-alert';

const Test = () => {
    let alert = useAlert();
    return (<div>
        <button onClick = {() => {
            alert.show('Order placed successfully');   
        }}>
            Click me pls
        </button>
    </div>);
};

export default Test;