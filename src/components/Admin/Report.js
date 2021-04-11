import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Spinner} from 'reactstrap';
import constants from '../../constants';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useAlert } from 'react-alert';

const API_URL = constants.API_URL;

const Report = () =>  {
    let [isLoading, setIsLoading] = useState(false);
    const alert = useAlert();

    const handleDownload = async (e) => {
        setIsLoading(true);
        try {
            let config = {
                headers: {
                    'Authorization': `token ${localStorage.getItem('accessToken')}` || ''
                },
                responseType: 'blob',
                params: {
                    r_type: e.target.name
                }
            };
            let res = await axios.get(`${API_URL}/secure/admin/reports`, config);
            await fileDownload(res.data, `${Date.now()}_${e.target.name}.pdf`);
        } catch (e) {
            alert.show('Unable to download report');
        }
        setIsLoading(false);
    };
    return (
        <div>
            <div className = 'container' style = {styles.formContainer}>
                <Form>
                    <h2>Reports</h2>
                    <div hidden = {!isLoading}>
                        <center>
                            <i>Crunching data to generate your report ... 
                            <br /><br />
                            </i><Spinner color = 'success' type = 'grow' />
                        </center>
                    </div>
                    <i>Available reports: </i>
                    <br/>
                    <br />
                    <FormGroup style = {{display: 'inline-block'}}>
                        <Label>Book report &nbsp;&nbsp;&nbsp;&nbsp; </Label>
                        <Button color = 'success' name = 'book' onClick = {handleDownload}>Generate</Button>
                    </FormGroup>
                    <hr />
                    <br />
                    <FormGroup style = {{display: 'inline-block'}}>
                        <Label>Order report &nbsp;&nbsp;&nbsp;&nbsp; </Label>
                        <Button color = 'success' name = 'order' onClick = {handleDownload}>Generate</Button>
                    </FormGroup>
                    <hr />
                    <br />
                    <FormGroup style = {{display: 'inline-block'}}>
                        <Label>User report &nbsp;&nbsp;&nbsp;&nbsp; </Label>
                        <Button color = 'success' name = 'user' onClick = {handleDownload}>Generate</Button>
                    </FormGroup>
                    <hr />
                    <br />
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

export default Report;