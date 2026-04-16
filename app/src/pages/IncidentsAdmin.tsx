import { useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap';
import { Incident } from "../models/Incident";
import * as incidentService from "../services/incident-service"
import { useNavigate } from "react-router-dom";
import IncidentCard from "../components/IncidentCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Roles } from "../models/Roles";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './IncidentsAdmin.css';
import { useTranslation } from 'react-i18next';

export function IncidentsAdmin() {

    // Fetching user state from redux store
    const user = useSelector((state: RootState) => state.user);
    const [incidents, setIncidents] = useState<{ [key: string]: Incident[] }>({});
    const navigate = useNavigate();
    const { t } = useTranslation('incidentsadmin');

    useEffect(() => {
        fetchIncidents();
        // Checks whether the user has access to view this page. If not, redirects to home page
        if (user.role === Roles.USER) {
            navigate('/home')
        }
    }, [user.role]);

    const fetchIncidents = async () => {
        try {
            // Location is not being passed here, as admin should've all the incidents listed in his page
            incidentService.getAllIncidentsForALocation({desired: "all"})
                           .then(result => {
                            console.log(result.data);
                            setIncidents(result.data)
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

    // return icons based on status
    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bi-hourglass-split';
            case 'approved':
                return 'bi-check-circle-fill';
            case 'rejected':
                return 'bi-x-circle-fill';
            case 'ignored':
                return 'bi-eye-slash-fill';
            default:
                return 'bi-question-circle-fill';
        }
    };

    return (
        <Container>
            {Object.keys(incidents).length !== 0 ?
                Object.keys(incidents).map((status) => (
                    <div key={status}>
                        {incidents[status].length !== 0 &&
                        <>
                            <div key={status} className={`status-section ${status.toLowerCase()}`}>
                                <h2 className={`status-header ${status.toLowerCase()}-state`}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)} Incidents
                                    <i className={`bi ${getStatusIcon(status)} status-icon`}></i>
                                </h2>
                                <Row>
                                    {incidents[status].map((incident) => (
                                        <IncidentCard key={incident.id} incident={incident} onClick={handleCardClick}/>
                                    ))}
                                </Row>
                            </div>
                            <br/>
                        </>
                        
                        }
                        
                    </div>)
                )
                :
                <div>{t('incidentsAdmin.noIncidents')}</div>
            }
        </Container>
    );
}