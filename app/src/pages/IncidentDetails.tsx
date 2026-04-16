// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom"
// // import { Action, Incident } from "../models/Incident";
// // import { getIncidentById, updateIncidentStatus } from "../services/incident-service";
// // import { Container, Row, Col, Carousel, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
// // import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import IncidentForm from "./IncidentForm";
// // import serverUrl, { uploadedfilesPathInServer } from "../services";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../redux/store";
// // import { Roles } from "../models/Roles";

// // export function IncidentDetails() {

// //     // Fetching user state from redux store
// //     const user = useSelector((state: RootState) => state.user);
// //     const { id } = useParams<{ id: string }>();
// //     const [incident, setIncident] = useState<Incident | null>(null);
// //     const [message, setMessage] = useState('');
// //     const [showEditForm, setShowEditForm] = useState(false);

    
// //     useEffect(() => {
// //         getIncidentById(id || '')
// //             .then(result => {
// //                 setIncident(result.data)
// //                 console.log(result.data)
// //     })
// //             .catch(err => console.log(err.message));
// //     }, [id]);

// //     // When action is updated, call backend and update the incident's action
// //     const handleStatusChange = async (action: string) => {
// //         try {
// //             if (id) {
// //                 updateIncidentStatus(id, action, message)
// //                     .then((result) => setIncident(result.data));
// //             }
// //         } catch (error) {
// //             console.error('Failed to update incident status:', error);
// //         }
// //     };

// //     // Dynamic styles to display the status of Incident
// //     const getStatusStyle = (action: string) => {
// //         switch (action) {
// //             case 'approved':
// //                 return { backgroundColor: '#28a745', color: 'white', padding: '5px', borderRadius: '5px' };
// //             case 'rejected':
// //                 return { backgroundColor: '#dc3545', color: 'white', padding: '5px', borderRadius: '5px' };
// //             case 'ignored':
// //                 return { backgroundColor: '#6c757d', color: 'white', padding: '5px', borderRadius: '5px' };
// //             default:
// //                 return {};
// //         }
// //     };

// //     // This function is called from the Incident Form component on successful submission
// //     const updateIncidentFromEditForm = (incident: Incident) => {
// //         setIncident(incident);
// //         setShowEditForm(!showEditForm);
// //     }

// //     // Used to toggle the display of Incident Form component
// //     const toggleEditForm = () => {
// //         setShowEditForm(!showEditForm);
// //     };

// //     return (
// //         incident ? (
// //             <Container>
// //                 <h1 className="text-center mb-3">Incident Details</h1>
// //                 <Row>
// //                     <Col md={6}>
// //                         <Carousel>
// //                             {incident.images && incident.images.length > 0 ? (
// //                                 incident.images.map((image, idx) => (
// //                                     <Carousel.Item key={idx}>
// //                                         <img
// //                                             className="d-block w-100 h-350px"
// //                                             src={`${serverUrl}/${uploadedfilesPathInServer}/${image}`}
// //                                             alt={`Incident Image ${idx}`}
// //                                         />
// //                                     </Carousel.Item>
// //                                 ))
// //                             ) : (
// //                                 <Carousel.Item>
// //                                     <img
// //                                         className="d-block w-100"
// //                                         src="/images/alert_img.jpg" // Placeholder image
// //                                         alt="Default Incident"
// //                                     />
// //                                 </Carousel.Item>
// //                             )}
// //                         </Carousel>
// //                         <div>
// //                             <p><strong>Type:</strong> {incident.type}</p>
// //                             <p><strong>Details:</strong> {incident.details}</p>
// //                             <p><strong>Address:</strong> {incident.address}</p>
// //                             <p><strong>City:</strong> {incident.city}</p>
// //                             <p><strong>State:</strong> {incident.state}</p>
// //                         </div>
// //                     </Col>
// //                     <Col md={6}>
// //                         {incident.latitude && incident.longitude ? (
// //                             <MapContainer
// //                                 center={[incident.latitude, incident.longitude]}
// //                                 zoom={13}
// //                                 style={{ height: '400px', width: '100%'}}
// //                             >
// //                                 <TileLayer
// //                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                                 />
// //                                 <Marker position={[incident.latitude, incident.longitude]} />
// //                             </MapContainer>
// //                         ) : (
// //                             <div>No location data available</div>
// //                         )}
// //                         {incident.action ? (
// //                             <>
// //                                 <div className="mt-2">
// //                                     <strong>Status:</strong> 
// //                                     <span style={getStatusStyle(incident.action)}>
// //                                         {incident.action || 'No Action Taken'}
// //                                     </span>
// //                                 </div>
// //                                 {incident.message && incident.message?.trim() !== '' && <div><strong>Message:   </strong> {incident.message}</div>}
// //                             </>
// //                         ):(
// //                             // Should be able to edit only if he is an admin
// //                             user.role === Roles.ADMIN
// //                             &&
// //                             <Form>
// //                                 <InputGroup className="mb-3">
// //                                     <FormControl
// //                                         placeholder="Enter your message"
// //                                         aria-label="Administrator's message"
// //                                         onChange={e => setMessage(e.target.value)}
// //                                     />
// //                                 </InputGroup>
// //                                 <Button variant="success" onClick={() => handleStatusChange(Action.Approved)}>Approve</Button>
// //                                 <Button variant="danger" onClick={() => handleStatusChange(Action.Rejected)}>Reject</Button>
// //                                 <Button variant="secondary" onClick={() => handleStatusChange(Action.Ignored)}>Ignore</Button>
// //                             </Form>
// //                         )} 
                        
// //                     </Col>
// //                 </Row>
// //                 {
// //                     // Should be able to edit only if he is an admin
// //                     user.role === Roles.ADMIN 
// //                     &&
// //                     <>
// //                         <Button onClick={toggleEditForm}>Edit Incident</Button>
// //                         {showEditForm && (
// //                         <IncidentForm incident={incident} mode="edit" updateIncidentEditFlow={updateIncidentFromEditForm}/>
// //                         )}
// //                     </>
// //                 }
// //             </Container>
// //         ) : (
// //             <div>No incident data found!</div>
// //         )
        
// //     )
// // }


import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Action, Incident } from "../models/Incident";
import { getIncidentById, updateIncidentStatus } from "../services/incident-service";
import { Container, Row, Col, Carousel, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import IncidentForm from "./IncidentForm";
import serverUrl, { uploadedfilesPathInServer } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Roles } from "../models/Roles";
import { useTranslation } from 'react-i18next';
import { MdArrowBack, MdEdit } from 'react-icons/md'; // Import Material Icon for edit button

export function IncidentDetails() {
    const user = useSelector((state: RootState) => state.user);
    const { id } = useParams<{ id: string }>();
    const [incident, setIncident] = useState<Incident | null>(null);
    const [message, setMessage] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [actionTaken, setActionTaken] = useState('');
    const { t } = useTranslation('incidentdetails');
    const editFormRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getIncidentById(id || '')
            .then(result => {
                setIncident(result.data);
                console.log(result.data);
            })
            .catch(err => console.log(err.message));
    }, [id]);

    useEffect(() => {
        if (showEditForm && editFormRef.current) {
            editFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showEditForm]);


    const handleStatusChange = async (action: string) => {
        try {
            if (id) {
                setActionTaken(action); // Update local action state
                updateIncidentStatus(id, action, message)
                    .then(result => setIncident(result.data));
            }
        } catch (error) {
            console.error('Failed to update incident status:', error);
        }
    };

    const getStatusStyle = (action: string) => {
        switch (action) {
            case 'approved': return { backgroundColor: '#28a745', color: 'white', padding: '5px', borderRadius: '5px', border: 'none' };
            case 'rejected': return { backgroundColor: '#dc3545', color: 'white', padding: '5px', borderRadius: '5px', border: 'none' };
            case 'ignored': return { backgroundColor: '#6c757d', color: 'white', padding: '5px', borderRadius: '5px', border: 'none' };
            default: return {};
        }
    };

    const updateIncidentFromEditForm = (incident: Incident) => {
        setIncident(incident);
        setShowEditForm(!showEditForm);
    }

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
    };

    return (
        <Container style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {/*Back Button to go back to previous screen where all the incidents are listed*/}
            <Button  className="back-btn" onClick={() => user.role === Roles.ADMIN ? navigate('/admin/incidents') : navigate('/incidents')}>
                <span className="icon-circle">
                    <MdArrowBack /> {t('page.back')}
                </span>
            </Button>
            {incident ? (
                <div>
                    <h1 className="text-center mb-3">{t('incidentDetails.title')}</h1>
                    {user.role === Roles.ADMIN && (
                        <Button
                            variant="outline-info"
                            className="edit-incident-button"
                            onClick={toggleEditForm}
                            style={{ position: 'relative', right: '-88%', top: '-58px' }} // Move button 40px to the right
                        >
                           Edit Incident <MdEdit />{/* Material Icon edit button */}
                        </Button>
                    )}
                    <Row>
                        <Col md={6}>
                            <div>
                                <Carousel interval={3000}>
                                    {incident.images && incident.images.length > 0 ? incident.images.map((image, idx) => (
                                        <Carousel.Item key={idx}>
                                            <img className="d-block w-100" style={{ height: '400px' }} src={`${serverUrl}/${uploadedfilesPathInServer}/${image}`} alt={`Incident Image ${idx}`} />
                                        </Carousel.Item>
                                    )) : (
                                        <Carousel.Item>
                                            <img className="d-block w-100" style={{ height: '400px' }} src="/images/alert_img.jpg" alt="Default Incident" />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </div>
                            <div className="mt-3">
                                <p className="ms-0"><strong>{t('incidentDetails.typeLabel')}</strong> {incident.type} Incident</p>
                                <p className="ms-0"><strong>{t('incidentDetails.detailsLabel')}</strong> {incident.details}</p>
                                <p className="ms-0"><strong>{t('incidentDetails.addressLabel')}</strong> {incident.address}, {incident.city}, {incident.state}</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            {incident.latitude && incident.longitude ? (
                                <MapContainer center={[incident.latitude, incident.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[incident.latitude, incident.longitude]} />
                                </MapContainer>
                            ) : <div>{t('incidentDetails.noLocationData')}</div>}
                            {incident.action ? (
                                <>
                                    <div className="mt-2 d-flex align-items-center">
                                        <strong className="me-3">{t('incidentDetails.status.header')}</strong>
                                        <Button style={getStatusStyle(incident.action)} className="status-button" disabled>{incident.action}</Button>
                                    </div>
                                    {incident.message && incident.message.trim() !== '' && <div><strong>{t('incidentDetails.status.messageLabel')}</strong> {incident.message}</div>}
                                </>
                            ) : (
                                user.role === Roles.ADMIN &&
                                <Form>
                                    <InputGroup className="mb-3">
                                        <FormControl placeholder="Enter your message" aria-label="Administrator's message" onChange={(e: any) => setMessage(e.target.value)} />
                                    </InputGroup>
                                    <Button className="action-button me-2" variant={actionTaken === Action.Approved ? "success" : "outline-success"} onClick={() => handleStatusChange(Action.Approved)}>{t('incidentDetails.status.approveButton')}</Button>
                                    <Button className="action-button me-2" variant={actionTaken === Action.Rejected ? "danger" : "outline-danger"} onClick={() => handleStatusChange(Action.Rejected)}>{t('incidentDetails.status.rejectButton')}</Button>
                                    <Button className="action-button" variant={actionTaken === Action.Ignored ? "secondary" : "outline-secondary"} onClick={() => handleStatusChange(Action.Ignored)}>{t('incidentDetails.status.ignoreButton')}</Button>
                                </Form>
                            )}
                        </Col>
                    </Row>
                    {showEditForm 
                        && 
                    <div ref={editFormRef} className="mt-5" style={{width: '80%', height: '80%', margin: 'auto'}}>
                        <IncidentForm incident={incident} mode="edit" updateIncidentEditFlow={updateIncidentFromEditForm} toggleEditForm={toggleEditForm}/>
                    </div>
                    }
                </div>
            ) : <div>{t('incidentDetails.noDataFound')}</div>}
        </Container>
    );
}
