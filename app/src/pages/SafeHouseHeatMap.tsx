import { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, LoadScriptNext } from '@react-google-maps/api';
import * as safeHouseService from '../services/safehouse-service';
import config from '../configs/config';
import { SafeHouse } from '../models/Safehouse';
import { useTranslation } from 'react-i18next';

const containerStyle = {
  width: '80%',
  height: '60vh'
};

const center = {
  lat: 42.361145,
  lng: -71.057083
};

const libraries: any = ['visualization'];

const SafeHouseHeatMap = () => {
  const [heatMapData, setHeatMapData] = useState([]);
  const { t } = useTranslation('admindashboard');

  useEffect(() => {
    safeHouseService.getAllSafeHouses()
      .then(response => response.data)
      .then(data => { 
        const points = data.map((sh: SafeHouse) => ({
          location: new window.google.maps.LatLng(sh.location.coordinates.latitude, sh.location.coordinates.longitude),
          weight: 2  // Define weight if necessary, default is 1
        }));
        setHeatMapData(points);
      })
      .catch(error => {
        console.error("Failed to fetch safe houses:", error);
      });
  }, []);

  return (
    <div style={{ margin: '20px' }}>
        <h2>{t('safeHouseHeatMap.title')}</h2>
        <LoadScriptNext
        googleMapsApiKey={config.googleMapsApiKey}
        libraries={libraries}
        >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
        >
            {heatMapData.length > 0 && (
            <HeatmapLayer
                data={heatMapData}
                options={{
                radius: 30,
                opacity: 0.6
                }}
            />
            )}
        </GoogleMap>
        </LoadScriptNext>
    </div>
  );
};

export default SafeHouseHeatMap;
