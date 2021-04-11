import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import BookDetailView from './user_components/BookDetailView.js';
import { BookAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router';

const Book = () => {
    let [isLoading, setIsLoading] = useState(true);
    let [bookDetails, setBookDetails] = useState({});
    const alert = useAlert();
    const { b_id } = useParams();
    useEffect(async () => {
        try {
            let res = await BookAgent.getDetails({b_id: b_id});
            setBookDetails(res.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            alert.show('Error fetching book details');
        }
    }, []);
    return (
        <div hidden = {isLoading}>
            <br />
            <center>
                <Spinner color = 'success' hidden = {!isLoading} />
            </center>
            <BookDetailView b_id = {b_id} data = {bookDetails} />
        </div>
    );
};


export default Book;