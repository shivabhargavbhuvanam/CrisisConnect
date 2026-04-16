import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SafeHouse } from '../models/Safehouse';
import * as safeHouseService from '../services/safehouse-service';
import { Alert, Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Roles } from '../models/Roles';
import { useTranslation } from 'react-i18next';
import './../App.css'


const mapContainerStyle = {
  height: "50vh",
  width: "100%",
  marginTop: '10px'
};

const center = {
  lat: 42.361145, 
  lng: -71.057083 
};

function SafeHouseList() {

    // Fetching user state from redux store
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [safeHouses, setSafeHouses] = useState<SafeHouse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState({ show: false, message: '' });
    const [showModal, setShowModal] = useState(false);
    const [selectedSafeHouse, setSelectedSafeHouse] = useState<SafeHouse | null>(null);
    const { t } = useTranslation('getallsafehouses');

    useEffect(() => {
        fetchSafeHouses();
        // Checks whether the user has access to view this page. If not, redirects to home page
        if (user.role === Roles.USER) {
            navigate('/home')
        }
      }, [user.role]);
    
      async function fetchSafeHouses() {
        try {
          const response = await safeHouseService.getAllSafeHouses();
          setSafeHouses(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch safe houses:', error);
          setError('Failed to fetch safe houses');
          setIsLoading(false);
        }
      }
    
      async function deleteSafeHouse() {
        if (selectedSafeHouse) {
        try {
          await safeHouseService.deleteSafeHouse(selectedSafeHouse.id);
          setAlert({ show: true, message: 'SafeHouse is deleted successfully' });
          setShowModal(false); 
          fetchSafeHouses();  // Refresh the list after deletion
          setTimeout(() => setAlert({ show: false, message: '' }), 5000);  // Hide alert after 3 seconds
        } catch (error) {
          console.error('Failed to delete safe house:', error);
          setAlert({ show: true, message: 'Failed to delete safe house' });
          setTimeout(() => setAlert({ show: false, message: '' }), 3000);
        }
      }
    }
    
    const handleDeleteClick = (safeHouse: SafeHouse) => {
        setSelectedSafeHouse(safeHouse);
        setShowModal(true);
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container fluid>
            <Row className="justify-content-center mt-4">
                <h1 className="text-center">{t('allsafehouses.title')}</h1>
                {alert.show && <Alert variant="success" className="text-center">{alert.message}</Alert>}
            </Row>
            <Row>
                <Col md={6} className="overflow-auto" style={{ height: '100vh', paddingTop: '20px' }}>
                    <Row>
                    {safeHouses.map(safeHouse => (
                        <Col md={6} key={safeHouse.id} className="mb-3">
                            <Card className="card-hover" style={{ backgroundColor:'#c3c6c699'}}>
                                <Card.Body>
                                    <Card.Title>{safeHouse.name}</Card.Title>
                                    <Card.Text style={{marginLeft: '0px'}}>{safeHouse.email}</Card.Text>
                                    <Card.Text style={{marginLeft: '0px'}}>{safeHouse.address}</Card.Text>
                                    <div className="card-buttons">
                                    <Button variant="primary" onClick={() => navigate(`/update-safehouse/${safeHouse.id}`)} style={{ marginLeft: '10px' }}>{t('allhouses.edit')}</Button>
                                    <Button variant="danger" onClick={() => handleDeleteClick(safeHouse)} style={{ marginLeft: '10px' }}>{t('allhouses.delete')}</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    </Row>
                </Col>
                <Col md={6}>
                    <MapContainer style={mapContainerStyle} center={center} zoom={10} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {safeHouses.map((safeHouse) => (
                            <Marker
                                key={safeHouse.id}
                                position={{
                                    lat: safeHouse.location.coordinates.latitude,
                                    lng: safeHouse.location.coordinates.longitude
                                }}
                            >
                                <Popup>{safeHouse.address}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    {/* <Row className="d-flex justify-content-center mt-3"> */}
                        <Button className="add-safehouse-btn" onClick={() => navigate('/add-safehouse')}>{t('allhouses.btn.addhouse')}</Button>
                    {/* </Row> */}
                </Col>
            </Row>
            {/* Confirmation Modal */}
             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                 <Modal.Header closeButton>
                       <Modal.Title>{t('allhouses.modal.title')}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                            <p>{t('modal.text')}{selectedSafeHouse?.name}"?</p>
                             <div className="modal-buttons">
                          <Button variant="secondary" onClick={() => setShowModal(false)} className="mr-2">{t('modal.no')}</Button>
                          <Button variant="danger" onClick={deleteSafeHouse}>{t('modal.yes')}</Button>
                            </div>
                 </Modal.Body>
          </Modal>
        </Container>
    );
}

export default SafeHouseList;
