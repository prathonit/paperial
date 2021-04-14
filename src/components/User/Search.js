import React, { useState } from 'react';
import { Button, Form, Input, Spinner, InputGroupAddon, InputGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { BookAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import BookFeedItem from './user_components/BookFeedItem.js';
import {
    IoArrowBackSharp,
    IoSearchOutline
} from 'react-icons/io5';
 
const Profile = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({searchType:'b_name'});
    const [searchResult, setSearchResult] = useState([]);
    const alert = useAlert();
    
    const handleInput = (e) => {
        formData[e.target.name] = e.target.value;
        setFormData(formData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (handleValidation(formData)) {
                let res = await BookAgent.getSearchResult(formData);
                setSearchResult(res.data);
            }
        } catch (e) {
            alert.show(e.response.data.msg);
        }
        setIsLoading(false);
    };
    const handleKeySubmit = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };
    const handleValidation = (data) => {
        if (!data.search_query) {
            alert.show('Please enter longer query');
            return false;
        }
        
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2><IoSearchOutline /> Search</h2>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Input type="select" name="searchType" id="searchType" onChange = {handleInput} placeholder = 'Search in:'>
                                <option value='b_name'>Books</option>
                                <option value='b_author'>Authors</option>
                            </Input> 
                        </InputGroupAddon>    
                        <Input type='text' name='search_query' id='search_query' onChange = {handleInput} placeholder = 'Start typing ...' />
                        
                    
                        <InputGroupAddon addonType="prepend">
                            <Button color="success" onClick = {handleSubmit}>
                                <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                                {(!isLoading) ? 'Search' : ''}
                            </Button>
                        </InputGroupAddon> 
                    </InputGroup>
                    <hr/>
                    <Link to='/home'> <IoArrowBackSharp /> Go back </Link>
                </Form>
                <br />
                <hr /> 
                {
                    searchResult.map(item => (
                        <div key='10'>
                            <BookFeedItem data={item}/>
                            <br />
                        </div>
                    ))
                }
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
 
export default Profile;