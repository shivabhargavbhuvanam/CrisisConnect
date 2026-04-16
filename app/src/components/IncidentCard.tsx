import { Card, Col, Carousel } from 'react-bootstrap';
import { Incident } from '../models/Incident';
import serverUrl, { uploadedfilesPathInServer } from '../services';
import './IncidentCard.css';

type IncidentCardProps = {
    incident: Incident,
    onClick: (id: string | undefined) => void
}

const IncidentCard = ({incident, onClick}: IncidentCardProps) => {
    return (
        <Col md={4} key={incident.id} className="my-4">
            <Card className="card-custom">
                <span className={`severity-tag severity-${incident.severityLevel.toLowerCase()}`}>
                    {incident.severityLevel.toUpperCase()}
                </span>
                <Carousel interval={3000} className="carousel-custom">
                    {incident.images && incident.images.length > 0 ? incident.images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100 carousel-image"
                                src={`${serverUrl}/${uploadedfilesPathInServer}/${image}`}
                                alt={`Slide ${index}`}
                            />
                        </Carousel.Item>
                    )): (
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-image"
                                src="/images/alert_img.jpg"
                            />
                        </Carousel.Item>
                    )}
                </Carousel>
                <Card.Body className="card-body-custom" onClick={() => onClick(incident.id)}>
                    <div>
                        <Card.Title className='card-title-custom'>{incident.type}</Card.Title>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', height: '140px' }}>
                        {incident.details}
                        </div>
                    </div>
                    <div className='mt-4' style={{fontSize: '14px', fontWeight: 'bold'}}>
                        <p style={{margin: '0px'}}>{incident.city}, {incident.state}</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default IncidentCard;
