import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import { AdminAgent } from '../../agent.js';
import { useAlert } from 'react-alert';
import ImageUploader from 'react-images-upload';

const Login = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        b_name: '', b_author: '', b_genre: '', b_desc: '', b_img: ''
    });
    const alert = useAlert();

    const handleInput = (e) => {
        formData[e.target.name] = e.target.value;
        setFormData(formData);
    };
    const handleUpload = async (img) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(img[0]);
            reader.onload = () => {
                formData['b_img'] = reader.result;
                setFormData(formData);
            };
            reader.onerror = () => {
                alert.show('Upload failed');
            };
        } catch (e) {
            alert.show('Error in uploading image');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (handleValidation(formData)) {
                await AdminAgent.addBook(formData);
                alert.show('Book added successfully');
            }
        } catch (e) {
            alert.show('Error in adding book');
        }
        setIsLoading(false);
    };
    const handleKeySubmit = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };
    const handleValidation = (data) => {
        if (!data.b_name || data.b_name.length < 1) {
            alert.show('Invalid book name');
            return false;
        }
        if (!data.b_author || data.b_author.length < 3) {
            alert.show('Invalid author name');
            return false;
        }
        if (!data.b_genre || data.b_genre.length < 3) {
            alert.show('Invalid genre');
            return false;
        }
        if (!data.b_desc || data.b_desc.length < 3) {
            alert.show('Invalid desc');
            return false;
        }
        if (!data.b_img || data.b_img.length < 3) {
            alert.show('Please upload book image');
            return false;
        }
        return true;
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form onKeyDown = {handleKeySubmit}>
                    <h2>Add book</h2>
                    <br/>
                    <FormGroup>
                        <Input type="text" name="b_name" onChange = { handleInput } placeholder="Book name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="b_author" onChange = {handleInput} placeholder="Author name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="b_genre" onChange = { handleInput } placeholder="Book genre"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="b_desc" onChange = {handleInput} placeholder="Description"/>
                    </FormGroup>
                    <FormGroup>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose book image'
                            label='Max size: 5MB, format: PNG only'
                            onChange={handleUpload}
                            imgExtension={['.png']}
                            maxFileSize={5242880}
                            singleImage={true}
                            withPreview={true}
                        />
                        </FormGroup>
                    <FormGroup>
                        <Button color="success" onClick = {handleSubmit}>
                            <Spinner color = 'dark' size = 'sm' hidden = {!isLoading} />
                            {(!isLoading) ? 'Add book' : ''}
                        </Button>
                    </FormGroup>
                </Form>
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

export default Login;