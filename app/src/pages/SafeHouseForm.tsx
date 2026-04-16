import React, { useEffect, useState } from 'react';
import { SafeHouse } from './../models/Safehouse';
import * as safeHouseService from '../services/safehouse-service';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import config from '../configs/config';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Roles } from '../models/Roles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

const libraries: any = ["places"];

const initialCenter = {
    lat: 42.361145,
    lng: -71.057083
  };

function SafeHouseForm() {
    // Fetching user state from redux store
    const user = useSelector((state: RootState) => state.user);
    const { t } = useTranslation('safehouseform');
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.googleMapsApiKey,
        libraries
    });

    const [safeHouseData, setSafeHouseData] = useState<SafeHouse>({
        id: '',
        name: '',
        email: '',
        location: {
            coordinates: {
                latitude: initialCenter.lat,
                longitude: initialCenter.lng
            }
        },
        address: ''
    });
    const [address, setAddress] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({ type: '', message: '' });
    const navigate = useNavigate();
    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

    useEffect(() => {
        // Checks whether the user has access to view this page. If not, redirects to home page
        if (user.role === Roles.USER) {
            navigate('/home')
        }
    }, [user.role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSafeHouseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSelect = async () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results) {
                const location = results[0].geometry.location;
                const newCenter = { lat: location.lat(), lng: location.lng() };
                setSafeHouseData(prev => ({
                    ...prev,
                    location: {
                        coordinates: {
                            latitude: location.lat(),
                            longitude: location.lng()
                        }
                    },
                    address: results[0].formatted_address
                }));
                
                setMarker(newCenter);
                setMapCenter(newCenter);
                setAddress(results[0].formatted_address);
            } else {
                alert("Geocode was not successful: " + status);
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await safeHouseService.createSafeHouse(safeHouseData);
            alert('Safe House added successfully!');
            navigate('/get-safehouses');
        } catch (error: any) {
            setAlertContent({ type: 'danger', message: `Error while adding a safehouse: ${error.message}` });
            setShowAlert(true);
        }
    };

    if (!isLoaded) return "Loading Maps";

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <h1 className="text-center mt-4">{t('safeHouseForm.title')}</h1>
            </Row>
            <Row>
                <Col>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '50vh' }}
                        center={mapCenter}
                        zoom={15}
                    >
                        {marker && <Marker position={marker} />}
                    </GoogleMap>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>                   
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseForm.labels.name')}</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="name" value={safeHouseData.name} onChange={handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseForm.labels.email')}</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" name="email" value={safeHouseData.email} onChange={handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>{t('safeHouseForm.labels.address')}</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" value={address} onChange={handleAddress} required />
                            </Col>
                            <Col sm={2}>
                                <Button onClick={handleSelect}>{t('safeHouseForm.buttons.verify')}</Button>
                            </Col>
                        </Form.Group>
                        <Button type="submit" className="mb-3">{t('safeHouseForm.buttons.submit')}</Button>
                    </Form>
                    {showAlert && <Alert variant={alertContent.type}>{alertContent.message}</Alert>}
                </Col>
                
            </Row>
        </Container>    );
}

export default SafeHouseForm;
