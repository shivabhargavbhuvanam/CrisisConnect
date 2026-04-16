import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { SafeHouse } from '../models/Safehouse';
import * as safeHouseService from '../services/safehouse-service';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { getDistance } from 'geolib';
import { useTranslation } from 'react-i18next';
import { MdArrowBack } from 'react-icons/md';

interface SafeHouseWithDistance extends SafeHouse {
  distance: number; // Additional property for distance
}

const mapContainerStyle = {
  height: "50vh",
  width: "90%",
  margin: "25px auto"
};

const svgIcon = new L.DivIcon({
  className: 'custom-pin',
  iconSize: [30, 42],
  iconAnchor: [15, 21],
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff5733" width="40px" height="40px"> 
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>`
});

const ViewSafeHouses = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const latitude = parseFloat(queryParams.get('lat') || '0');
  const longitude = parseFloat(queryParams.get('lng') || '0');
  const { t } = useTranslation('viewsafehouses');
  const [safeHouses, setSafeHouses] = useState<SafeHouseWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndFilterSafeHouses() {
      try {
        const allSafeHouses = await safeHouseService.getAllSafeHouses();
        const safeHousesWithDistance = allSafeHouses.data.map((safeHouse: SafeHouseWithDistance) => ({
          ...safeHouse,
          distance: getDistance(
            { latitude: safeHouse.location.coordinates.latitude, longitude: safeHouse.location.coordinates.longitude },
            { latitude, longitude }
          )
        })).filter((safeHouse: SafeHouseWithDistance) => safeHouse.distance <= 4828);

        const sortedSafeHouses = safeHousesWithDistance.sort((a:SafeHouseWithDistance, b:SafeHouseWithDistance) => a.distance - b.distance).slice(0, 3);

        setSafeHouses(sortedSafeHouses);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch safe houses:', error);
        setError('Failed to fetch safe houses');
        setIsLoading(false);
      }
    }

    fetchAndFilterSafeHouses();
  }, [latitude, longitude]);

  const handleGetDirections = (safeHouse:SafeHouseWithDistance) => {
    const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${safeHouse.location.coordinates.latitude},${safeHouse.location.coordinates.longitude}&travelmode=driving`;
    window.open(directionUrl, '_blank');
  };

  if (isLoading) return <div className="text-center">{t('loading')}</div>;
  if (error) return <div className="text-center">{t('loading')} {error}</div>;

  return (
    <Container fluid style={{minHeight: '650px'}}>
      <Button  className="back-btn" onClick={() =>  navigate(-1)}>
          <span className="icon-circle">
              <MdArrowBack /> Back
          </span>
      </Button>
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">{t('safehouses.title')}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <MapContainer style={mapContainerStyle} center={{ lat: latitude, lng: longitude }} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={{ lat: latitude, lng: longitude }}
              icon={svgIcon}
            >
              <Popup>
              {t('your-location')}
              </Popup>
            </Marker>
            {safeHouses.map((safeHouse, index) => (
              <Marker
                key={index}
                position={{
                  lat: safeHouse.location.coordinates.latitude,
                  lng: safeHouse.location.coordinates.longitude
                }}
              >
                <Popup>
                  {safeHouse.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center" style={{ color: '#95af59' }}>{t('nearest-safehouses.title')}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {safeHouses.map((safeHouse, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 d-flex flex-column justify-content-between">
              <Card.Body>
                <Card.Title>{safeHouse.name}</Card.Title>
                <Card.Text style={{"marginLeft": "0px"}}>{safeHouse.address}</Card.Text>
                <Card.Text style={{"marginLeft": "0px"}}>{(safeHouse.distance / 1000).toFixed(2)} {t('distance.unit')}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="primary" onClick={() => handleGetDirections(safeHouse)} className="w-75">
                {t('get-directions')}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewSafeHouses;