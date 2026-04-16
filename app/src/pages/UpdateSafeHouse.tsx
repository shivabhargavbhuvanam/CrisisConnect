import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SafeHouse } from './../models/Safehouse';
import * as safeHouseService from '../services/safehouse-service';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import config from '../configs/config';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Roles } from '../models/Roles';
import { useTranslation } from 'react-i18next';


const libraries: any = ["places"];

function SafeHouseEditForm() {
    // Fetching user state from redux store
    const user = useSelector((state: RootState) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation('updatesafehouse');
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.googleMapsApiKey,
        libraries
    });

    const [safeHouseData, setSafeHouseData] = useState<SafeHouse | null>(null);
    const [address, setAddress] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({ type: '', message: '' });
    const [marker, setMarker] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

    useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== 'string') {
                console.error('Safe house ID is undefined');
                navigate('/'); // Optionally navigate away or handle the error differently
                return;
            }

            try {
                const response = await safeHouseService.getSafeHouseById(id);
                setSafeHouseData(response.data);
                setAddress(response.data.address);
                setMarker({ lat: response.data.location.coordinates.latitude, lng: response.data.location.coordinates.longitude });
            } catch (error) {
                console.error('Error fetching safe house:', error);
                navigate('/');
            }
        };
        fetchData();
        if (user.role === Roles.USER) {
            navigate('/home')
        }
    }, [id, navigate, user.role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSafeHouseData(prev => {
            if (prev === null) return null;
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSelect = async () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results) {
                const location = results[0].geometry.location;
                setSafeHouseData(prev => {
                    if (prev === null) {
                        console.error('Previous safe house data is null');
                        return null;  // Or set up a default SafeHouse object here
                    }
                    return {
                        ...prev,  // Ensures all previous fields are maintained
                        location: {
                            coordinates: {
                                latitude: location.lat(),
                                longitude: location.lng()
                            }
                        },
                        address: results[0].formatted_address  // Update address with formatted address
                    };
                });
                setMarker({ lat: location.lat(), lng: location.lng() });
                setAddress(results[0].formatted_address);
            } else {
                alert("Geocode was not successful: " + status);
            }
        });
    };

    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!safeHouseData || typeof id !== 'string') { // Check if id is a string
            setAlertContent({ type: 'danger', message: 'Invalid operation: Safe house ID is missing.' });
            setShowAlert(true);
            return;
        }
        try {
            await safeHouseService.updateSafeHouse(id, safeHouseData);
            alert('Safe House updated successfully!');
            navigate('/get-safehouses');
        } catch (error: any) {
            setAlertContent({ type: 'danger', message: `Error while updating safehouse: ${error.message}` });
            setShowAlert(true);
        }
    };
    

    if (!safeHouseData) return t('safeHouseEditForm.loading');
    if (!isLoaded) return t('safeHouseEditForm.loadingMaps');

    return (
        <Container fluid>
            <Row>
                <Col md={12}>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={marker.lat !== 0 ? marker : undefined}
                        zoom={15}
                    >
                        {marker.lat !== 0 && <Marker position={marker} />}
                    </GoogleMap>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="text-center mt-4">{t('safeHouseEditForm.editSafeHouseTitle')}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseEditForm.labels.name')}</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="name" value={safeHouseData?.name || ''} onChange={handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseEditForm.labels.email')}</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" name="email" value={safeHouseData?.email || ''} onChange={handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseEditForm.labels.address')}</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" value={address} onChange={handleAddress} required />
                            </Col>
                            <Col sm={2}>
                                <Button onClick={handleSelect}>{t('safeHouseEditForm.buttons.verify')}</Button>
                            </Col>
                        </Form.Group>
                        <Button type="submit" className="mb-3">{t('safeHouseEditForm.buttons.update')}</Button>
                    </Form>
                    {showAlert && <Alert variant={alertContent.type} className="text-center">{alertContent.message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default SafeHouseEditForm;
