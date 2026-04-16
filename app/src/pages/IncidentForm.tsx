// // // // import { useState } from 'react';
// // // // import { Alert,Form, Button, Container, Row, Col } from 'react-bootstrap';
// // // // import { Action, Incident, IncidentType, SeverityLevel } from '../models/Incident';
// // // // import * as incidentService from '../services/incident-service';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import serverUrl, { uploadedfilesPathInServer } from '../services';
// // // // import { USStates } from '../models/StateInfo';
// // // // import { useSelector } from 'react-redux';
// // // // import { RootState } from '../redux/store';
// // // // import { Roles } from '../models/Roles';

// // // // type IncidentFormProps = {
// // // //     incident: Incident,
// // // //     mode: string,
// // // //     updateIncidentEditFlow?: (incident: Incident) => void
// // // // }

// // // // function IncidentForm(props: IncidentFormProps) {

// // // //     // Fetching user state from redux store
// // // //     const user = useSelector((state: RootState) => state.user);
// // // //     // incidentDate state
// // // //     const [incidentData, setIncidentData] = useState<Incident>(props.incident);

// // // //     const [images, setImages] = useState<File[]>([])
// // // //     const [showAlert, setShowAlert] = useState(false);
// // // //     const [alertContent, setAlertContent] = useState({ type: '', message: '' });
// // // //     const navigate = useNavigate();


// // // //     // Function to handle form submission
// // // //     const handleSubmit = async (event: any) => {
// // // //         event.preventDefault();

// // // //         try {
// // // //             if (props.mode === 'edit' && user.role === Roles.ADMIN) {
// // // //                 incidentService.updateIncident(incidentData, images)
// // // //                         .then((result)=> props.updateIncidentEditFlow && props.updateIncidentEditFlow(result.data))
// // // //                         .catch(error => new Error(error))
// // // //             } else {
// // // //                 // Adding the user details for further reference
// // // //                 incidentData.reportedBy=user.username ? user.username : incidentData.reportedBy;
// // // //                 console.log(incidentData.reportedBy)
// // // //                 // Sends form data to backend server to store in db
// // // //                 await incidentService.createIncident(incidentData, images)
// // // //                 // after successful saving of data, returning back to home page
// // // //                 navigate(-1);
// // // //             }
// // // //         } catch (error:any) {
// // // //             // Something went wrong while sending data to backend server. Error cause will be shown as an alert
// // // //             setAlertContent({ type: 'danger', message: `Error while reporting incident: ${error.message}` });
// // // //             setShowAlert(true);
// // // //         }
       
// // // //     };


// // // //     // Function to handle changes in the form inputs
// // // //     const handleChange = (event: any) => {
// // // //         const { name, value } = event.target;
// // // //         setIncidentData(prevState => ({
// // // //             ...prevState,
// // // //             [name]: value
// // // //         }));
// // // //     };

// // // //     // Function to handle file selection
// // // //     const handleFileChange = (event: any) => {
// // // //         const files: File[] = Array.from(event.target.files);
// // // //         setImages(files);
// // // //     };

// // // //     const handleImageDelete = (url: string) => {
// // // //         setIncidentData(prevState => ({
// // // //             ...prevState,
// // // //             "images": prevState.images?.filter(img => img !== url)
// // // //         }));
// // // //         console.log(incidentData);
// // // //     };


// // // //     return (
// // // //         <div className="landing-page-container"> 
// // // //         <Container>
// // // //             <Row className="justify-content-md-start">
// // // //                 <Col xs={12} md={8}>
// // // //                 {showAlert && (
// // // //                     <Alert variant={alertContent.type} onClose={() => setShowAlert(false)} dismissible>
// // // //                         {alertContent.message}
// // // //                     </Alert>
// // // //                 )}
// // // //                 <h1>{props.mode === 'edit' ? 'Edit Incident' : 'Report New Incident'}</h1>
// // // //                 <Form onSubmit={handleSubmit}>
// // // //                     <Form.Group controlId="incidentType">
// // // //                         <Form.Label>Type</Form.Label>
// // // //                         <Form.Control as="select" name="type" value={incidentData.type} onChange={handleChange} required>
// // // //                             <option value="">Select Type</option>
// // // //                             {Object.values(IncidentType).map((type) => (
// // // //                                 <option key={type} value={type}>
// // // //                                     {type}
// // // //                                 </option>
// // // //                             ))}
// // // //                         </Form.Control>
// // // //                     </Form.Group>

// // // //                     <Form.Group controlId="incidentDetails">
// // // //                         <Form.Label>Details</Form.Label>
// // // //                         <Form.Control as="textarea" rows={3} name="details" value={incidentData.details} onChange={handleChange} required/>
// // // //                     </Form.Group>

// // // //                     <Form.Group controlId="incidentSeverityLevel">
// // // //                         <Form.Label>Severity Level</Form.Label>
// // // //                         <Form.Control as="select" name="severityLevel" value={incidentData.severityLevel} onChange={handleChange} required>
// // // //                             <option value="">Select Severity</option>
// // // //                             {Object.values(SeverityLevel).map((type) => (
// // // //                                 <option key={type} value={type}>
// // // //                                     {type}
// // // //                                 </option>
// // // //                             ))}
// // // //                         </Form.Control>
// // // //                     </Form.Group>

// // // //                     <Form.Group controlId="incidentAddress">
// // // //                         <Form.Label>Address</Form.Label>
// // // //                         <Form.Control type="text" name="address" value={incidentData.address} onChange={handleChange} placeholder="Enter address" required/>
// // // //                     </Form.Group>

// // // //                     <Form.Group controlId="incidentCity">
// // // //                         <Form.Label>City</Form.Label>
// // // //                         <Form.Control type="text" name="city" value={incidentData.city} onChange={handleChange} placeholder="Enter city" required/>
// // // //                     </Form.Group>
                    

// // // //                     <Form.Group controlId="incidentState">
// // // //                         <Form.Label>State</Form.Label>
// // // //                         <Form.Control as="select" name="state" value={incidentData.state} onChange={handleChange} required>
// // // //                             <option value="">Select a State</option>
// // // //                             {Object.entries(USStates).map(([state, abbreviation]) => (
// // // //                                 <option key={state} value={state}>{abbreviation}</option>
// // // //                             ))}
// // // //                         </Form.Control>
// // // //                     </Form.Group>

// // // //                     {props.mode !== 'edit' &&
// // // //                         <Form.Group controlId="incidentImages">
// // // //                             <Form.Label>Images</Form.Label>
// // // //                             <Form.Control type="file" name="images" onChange={handleFileChange} multiple accept="image/png, image/jpeg"/>
// // // //                         </Form.Group>
// // // //                     }

// // // //                     {props.mode === 'edit' && (
// // // //                         <>
// // // //                             <div>
// // // //                                 Existing Images<br/><br/>
// // // //                                 {incidentData.images?.map((image, idx) => (
// // // //                                     <div key={`ei-${idx}`}>
// // // //                                         <img src={`${serverUrl}/${uploadedfilesPathInServer}/${image}`} alt={`Existing Image ${idx}`} style={{ width: '300px', height: '200px' }} />
// // // //                                         <Button variant="danger" onClick={() => handleImageDelete(image)}>Delete</Button><br/><br/>
// // // //                                     </div>
// // // //                                 ))}
// // // //                                 <Form.Group controlId="incidentImagesNew">
// // // //                                     <Form.Label>New Images</Form.Label>
// // // //                                     <Form.Control type="file" onChange={handleFileChange} multiple accept="image/*" />
// // // //                                 </Form.Group>
// // // //                             </div>
// // // //                             {incidentData.action && 
// // // //                             <>
// // // //                                 <Form.Group controlId="incidentMessage">
// // // //                                     <Form.Label>Message</Form.Label>
// // // //                                     <Form.Control as="textarea" rows={3} name="message" value={incidentData.message || ''} onChange={handleChange} />
// // // //                                 </Form.Group>
// // // //                                 <Form.Group controlId="incidentAction">
// // // //                                     <Form.Label>Action</Form.Label>
// // // //                                     <Form.Control as="select" name="action" value={incidentData.action || ''} onChange={handleChange} required>
// // // //                                         <option value="">Select Action</option>
// // // //                                         {Object.values(Action).map(action => (
// // // //                                             <option key={action.toUpperCase()} value={action}>
// // // //                                                 {action}
// // // //                                             </option>
// // // //                                         ))}
// // // //                                     </Form.Control>
// // // //                                 </Form.Group>
// // // //                             </>
// // // //                             }
// // // //                         </>
// // // //                     )}

// // // //                     <Button variant="primary" type="submit" className='mt-5 button'>
// // // //                         Submit
// // // //                     </Button>
// // // //                 </Form>
// // // //                 </Col>
// // // //             </Row>
// // // //         </Container>
// // // //         </div>
// // // //     )
// // // // }

// // // // export default IncidentForm




import { useState, ChangeEvent, FormEvent } from 'react';
import { Alert, Button, Container, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Action, Incident, IncidentType, SeverityLevel } from '../models/Incident';
import * as incidentService from '../services/incident-service';
import { useNavigate } from 'react-router-dom';
import serverUrl, { uploadedfilesPathInServer } from '../services';
import { USStates } from '../models/StateInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Roles } from '../models/Roles';
import { useTranslation } from 'react-i18next';

type IncidentFormProps = {
    incident: Incident,
    mode: string,
    updateIncidentEditFlow?: (incident: Incident, action: string) => void
    toggleEditForm?: () => void;
}

function IncidentForm(props: IncidentFormProps) {
    const user = useSelector((state: RootState) => state.user);
    const [incidentData, setIncidentData] = useState<Incident>(props.incident);
    const [images, setImages] = useState<File[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertContent, setAlertContent] = useState<{ type: string, message: string }>({ type: '', message: '' });
    const navigate = useNavigate();
    const { t } = useTranslation('incidentform');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (props.mode === 'edit' && user.role === Roles.ADMIN) {
                incidentService.updateIncident(incidentData, images)
                    .then((result) => props.updateIncidentEditFlow && props.updateIncidentEditFlow(result.data, 'submitted'))
                    .catch(error => new Error(error))
            } else {
                incidentData.reportedBy = user.username ? user.username : incidentData.reportedBy;
                await incidentService.createIncident(incidentData, images);
                navigate(-1);
            }
        } catch (error: any) {
            setAlertContent({ type: 'error', message: `Error while reporting incident: ${error.message}` });
            setShowAlert(true);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setIncidentData(prevState => ({
            ...prevState,
            [name as string]: value
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(event.target.files as FileList);
        setImages(files);
    };

    const handleImageDelete = (url: string) => {
        setIncidentData(prevState => ({
            ...prevState,
            "images": prevState.images?.filter(img => img !== url)
        }));
    };

    return (
        <div className="landing-page-container">
            <Container>
                <Typography variant="h3" sx={{ marginBottom: '20px', fontFamily: 'Montserrat, sans-serif', color: '#95AF59' }}>{props.mode === 'edit' ? t('incidentForm.title.edit') : t('incidentForm.title.report')}</Typography>
                {showAlert && (
                    <Alert severity={alertContent.type as 'error'} onClose={() => setShowAlert(false)} sx={{ marginBottom: '20px' }}>
                        {alertContent.message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <Typography variant="caption" sx={{ marginBottom: '5px' }}>Type</Typography>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <Select name="type" value={incidentData.type} displayEmpty onChange={handleChange} required>
                            <MenuItem value="" disabled>{t('incidentForm.label.type')}</MenuItem>
                            {Object.values(IncidentType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        name="details"
                        value={incidentData.details}
                        onChange={handleChange}
                        label="Details"
                        variant="outlined"
                        sx={{ marginBottom: '20px' }}
                        required
                    />

                    <Typography variant="caption" sx={{ marginBottom: '5px' }}>{t('incidentForm.label.severityLevel')}</Typography>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <Select name="severityLevel" value={incidentData.severityLevel} displayEmpty onChange={handleChange} required>
                            <MenuItem value="" disabled>{t('incidentForm.placeholder.selectSeverity')}</MenuItem>
                            {Object.values(SeverityLevel).map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        type="text"
                        name="address"
                        value={incidentData.address}
                        onChange={handleChange}
                        label="Address"
                        variant="outlined"
                        sx={{ marginBottom: '20px' }}
                        required
                    />

                    <TextField
                        fullWidth
                        type="text"
                        name="city"
                        value={incidentData.city}
                        onChange={handleChange}
                        label="City"
                        variant="outlined"
                        sx={{ marginBottom: '20px' }}
                        required
                    />

                    <Typography variant="caption" sx={{ marginBottom: '5px' }}>{t('incidentForm.label.state')}</Typography>
                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                        <Select name="state" value={incidentData.state} displayEmpty onChange={handleChange} required>
                            <MenuItem value="" disabled>{t('incidentForm.placeholder.selectState')}</MenuItem>
                            {Object.entries(USStates).map(([state, abbreviation]) => (
                                <MenuItem key={state} value={state}>{abbreviation}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {props.mode !== 'edit' &&
                        <TextField
                            fullWidth
                            type="file"
                            name="images"
                            onChange={handleFileChange}
                            label="Images"
                            variant="outlined"
                            sx={{ marginBottom: '20px' }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ multiple: true, accept: "image/png, image/jpeg" }}
                        />
                    }

                    {props.mode === 'edit' && (
                        <>
                            <Typography variant="h5" sx={{ marginTop: '20px', marginBottom: '10px' }}>{t('incidentForm.label.existingImages')}</Typography>
                            {incidentData.images?.map((image, idx) => (
                                <div key={`ei-${idx}`} style={{ marginBottom: '20px' }}>
                                    <img src={`${serverUrl}/${uploadedfilesPathInServer}/${image}`} alt={`Existing Image ${idx}`} style={{ width: '300px', height: '200px', marginBottom: '10px' }} />
                                    <Button variant="contained" color="error" onClick={() => handleImageDelete(image)} sx={{ marginTop: '10px', marginLeft: '20px' }}>{t('incidentForm.button.delete')}</Button>
                                </div>
                            ))}
                            <TextField
                                fullWidth
                                type="file"
                                onChange={handleFileChange}
                                label="New Images"
                                variant="outlined"
                                sx={{ marginBottom: '20px' }}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ multiple: true, accept: "image/*" }}
                            />
                            {incidentData.action &&
                                <>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        name="message"
                                        value={incidentData.message || ''}
                                        onChange={handleChange}
                                        label="Message"
                                        variant="outlined"
                                        sx={{ marginBottom: '20px' }}
                                    />
                                    <Typography variant="caption" sx={{ marginBottom: '5px' }}>{t('incidentForm.label.action')}</Typography>
                                    <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                                        <Select name="action" value={incidentData.action || ''} displayEmpty onChange={handleChange} required>
                                            <MenuItem value="" disabled>{t('incidentForm.placeholder.selectAction')}</MenuItem>
                                            {Object.values(Action).map(action => (
                                                <MenuItem key={action.toUpperCase()} value={action}>
                                                    {action}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            }
                        </>
                    )}

                    <div className='mt-2'>
                        <Button variant="contained" type="submit" style={{width: '100px', backgroundColor: "#307277"}}>{t('incidentForm.button.submit')}</Button>
                        {
                            props.mode === 'edit' &&
                            <Button variant="contained" onClick={props.toggleEditForm} className='ms-4' style={{width: '100px', backgroundColor: 'grey'}}>{t('details.close')}</Button>
                        }
                    </div>
                </form>
            </Container>
        </div>
    );
}

export default IncidentForm;
