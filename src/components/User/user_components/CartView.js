import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Button,
    Spinner
} from 'reactstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';
import { OrderAgent } from '../../../agent.js';
import DatePicker from 'reactstrap-date-picker';
import { useAlert } from 'react-alert';
const moment = require('moment');

const CartView = (props) => {
    let [isOrderProcessing, setIsOrderProcessing] = useState(false);
    let [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    let [availabilityData, setAvailabilityData] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [formData, setFormData] = useState({b_id: props.b_id});
    const alert = useAlert();

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        setIsCheckingAvailability(true);
        setIsLoading(true);
        try {
            let res = await OrderAgent.checkAvailability({b_id: props.b_id});
            setAvailabilityData(res.data);
        } catch (e) {
            alert.show(e.response.msg);
        }
        setIsLoading(false);
    };
    const handleInputFrom = (v, f) => {
        formData['from'] = f;
        setFormData(formData);
    };
    const handleInputTo = (v, f) => {
        formData['to'] = f;
        setFormData(formData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsOrderProcessing(true);
        try {
            await OrderAgent.placeOrder(formData);
            alert.show('Order placed successfully');
        } catch (e) {
            alert.show(e.response.data.msg);
        }
        setIsOrderProcessing(false);
    };
    return (
        <div>
            <h3>Cart <FiShoppingCart /></h3>
            <Link onClick = {handleCheckAvailability} hidden = {isCheckingAvailability}><BsCheckAll />Check Future Availability</Link>
            <div hidden = {!isCheckingAvailability}>
                <br />
                <Spinner color = 'success' hidden = {!isLoading} />
                <div hidden = {isLoading} >
                    <i>This book has been booked for these dates: </i>
                    {availabilityData.map(element => (
                        <div key = '10'>
                            {moment(element.iss_date).format('MMMM Do YYYY')} to {moment(element.ret_date).format('MMMM Do YYYY')}
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />
            <Form>
                <FormGroup>
                    <Label>From: </Label>
                    <DatePicker dateFormat = 'YYYY/MM/DD' name = 'from_date' onChange = {(v, f) => handleInputFrom(v, f)} />
                </FormGroup>
                <FormGroup>
                    <Label>To: </Label>
                    <DatePicker dateFormat = 'YYYY/MM/DD' name = 'to_date' onChange = {handleInputTo} />
                </FormGroup>
                <FormGroup>
                    <Button color="success" onClick = { handleSubmit }>
                        <div hidden = {isOrderProcessing}>
                            <FiShoppingCart /> Order
                        </div>
                        <Spinner color = 'dark' size = 'sm' hidden = {!isOrderProcessing} />
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};

export default CartView;