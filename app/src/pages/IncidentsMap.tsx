import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as IncidentsService from '../services/incident-service';
import { Incident } from "../models/Incident";
import { useTranslation } from 'react-i18next';

const IncidentMap = () => {
  const { t } = useTranslation('admindashboard');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    IncidentsService.getAllIncidents()
     .then(response => response.data)
      .then(data => {
        setIncidents(data);
      })
      .catch(err => {
        console.error('Failed to fetch incidents:', err);
        setError('Failed to fetch incidents');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const position = [42.361145, -71.057083]; // Default position

  return (
    <div style={{ margin: '20px'}}>
        <h2>{t('incidentmap.title')}</h2>
        <MapContainer center={position} zoom={12} style={{ height: '50vh', width: '90%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {incidents.map((incident, idx) => (
            <Marker
            key={idx}
            position={[incident.latitude!, incident.longitude!]}
            >
            <Popup>
                {incident.address}
            </Popup>
            </Marker>
        ))}
        </MapContainer>
    </div>
  );
};

export default IncidentMap;
