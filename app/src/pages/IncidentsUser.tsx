import { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as incidentService from '../services/incident-service';
import * as mapsService from '../services/maps-service';
import IncidentCard from '../components/IncidentCard';
import { Incident } from '../models/Incident';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function IncidentsUser() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            // Fetches state code based on the current location
            const current_loc = await mapsService.getStateCodeFromCurrentLocation();
            // Fetches the location that is inputted by the user when he logs in
            const user_loc = user.location;
            const states: any = {}
            if (current_loc) {
                states.state1 = current_loc
            }
            if (user_loc && current_loc !== user_loc) {
                states.state2 = user_loc
            }
            incidentService.getAllIncidentsForALocation(states)
                           .then(result => {
                            setIncidents(result.data);
                            console.log(incidents);
                            setLoading(false);
                        });
        } catch (error) {
            console.error('Failed to fetch incidents:', error);
        }
    };

    const handleCardClick = (id: string | undefined) => {
        if (id) {
            navigate(`/incidents/${id}`);
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" className='text-center'/>
    }

    return (
        <Container>
            <Row>
                {incidents.length !== 0 ?
                    incidents.map((incident) => (
                        <IncidentCard key={incident.id} incident={incident} onClick={handleCardClick} />)
                    )
                    :
                    <div>No Incidents reported yet!</div>
                }
            </Row>
        </Container>
    );
}

export default IncidentsUser;
