import React from 'react';
// import { Link } from 'react-router-dom';
import {
    Toast,
    ToastBody,
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
const moment = require('moment');

const ReviewFeedItem = (props) => {
    return (
        <Toast style = {{maxWidth : '90%'}}>
            <ToastBody style = {{fontSize: 14, padding: 10, height: '100%'}}>
                <h6>
                    {props.data.u_id}
                </h6>
                <div>
                    { moment.unix(props.data.timestamp).format('MMMM Do YYYY, h:mm:ss a') }
                </div>
                <br />
                <StarRatingComponent 
                    name="rate1"
                    starCount={5}
                    value={props.data.rating}
                />
                <hr />
                <p>
                    {props.data.review}
                </p>
            </ToastBody>
        </Toast>
    );
};

export default ReviewFeedItem;