import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import config from '../configs/config';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HelpAssistance.css';

interface Place {
  id: string;
  name: string;
  vicinity: string;
  distance?: number; // Optional field for distance
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesAutocompleteProps {
  setSelected: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}


const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googleMapsApiKey,
    libraries: ["places", "geometry"],
  });

  const navigate = useNavigate();
  const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null);
  const [nearestHospitals, setNearestHospitals] = useState<Place[]>([]);
  const [nearestPoliceStations, setNearestPoliceStations] = useState<Place[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const { t } = useTranslation('helpassistance');
  const mapsRef = useRef<HTMLDivElement>(null); // This ref is added, so that we can navigate to map, when clicked on find nearby services

  const fetchPlaces = async (location: google.maps.LatLngLiteral, type: 'hospital' | 'police') => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const options: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      type: type,
    };

    service.nearbySearch(options, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const transformedResults = results.map(result => {
            let lat = 0;
            let lng = 0;
            if (result.geometry && result.geometry.location) {
                lat = result.geometry.location.lat();
                lng = result.geometry.location.lng();
              }

              const distance = (lat !== 0 && lng !== 0) ? google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(location.lat, location.lng),
                new google.maps.LatLng(lat, lng)
              ) : undefined; 

            return {
                id: result.place_id ?? 'unknown',
                name: result.name ?? 'No Name',
                vicinity: result.vicinity ?? 'No Address',
                geometry: {
                  location: { lat, lng }
                },
                distance: distance
        };
        }).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)).slice(0,3);

        if (type === 'hospital') {
          setNearestHospitals(transformedResults);
        } else {
          setNearestPoliceStations(transformedResults);
        }
      }
    });
  };

  const handleFindNearby = () => {
    if (!selected) return;
    mapsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    fetchPlaces(selected, 'hospital');
    fetchPlaces(selected, 'police');
  };

  const handleDirection = async (destination: google.maps.LatLngLiteral) => {
    if (!selected) return;

    // Clear previous directions first
    setDirections(null);
    setSelectedLocation(null);

    // Delay fetching new directions until after state updates
    setTimeout(async () => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: selected,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setSelectedLocation(destination); // Update the selected location with the new destination
          } else {
            console.error(`Error fetching directions: ${result}`);
          }
        }
      );
    }, 0); // Execute after the current call stack is cleared
};

//   const clearDirections = () => {
//     setDirections(null);
//     setSelectedLocation(null);
//   };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container className="help-assistance-section">
      <div style={{ marginBottom: '1rem' }}>
        <PlacesAutocomplete setSelected={setSelected} setSearchInput={setSearchInput} />
        <Button variant="contained" onClick={handleFindNearby} className="mt-4">{t('places.findNearby')}</Button>
      </div>
      {selected && (
        <div style={{ height: '400px', width: '100%' }} ref={mapsRef}>
          <GoogleMap
            zoom={10}
            center={selected}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {selected && (
            <Marker position={selected} />
            )}
            {nearestHospitals.concat(nearestPoliceStations).map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
              />
            ))}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: '#6200EE',
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>
      )}
      {searchInput && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <Typography variant="h5">{t('places.hospitals')}</Typography>
            {nearestHospitals.map((hospital, index) => (
              <div key={index}>
                <Typography variant="h6">{hospital.name}</Typography>
                <Typography variant="body2">{hospital.vicinity}</Typography>
                {hospital.distance !== undefined && (
                    <Typography variant="body2">{(hospital.distance / 1000).toFixed(2)} {t('places.km')}</Typography>
                    )}
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDirection(hospital.geometry.location);
                  }}
                >
                  {t('places.getDirections')}
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Typography variant="h5">{t('places.policeStations')}</Typography>
            {nearestPoliceStations.map((station, index) => (
              <div key={index}>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="body2">{station.vicinity}</Typography>
                {station.distance !== undefined && (
                    <Typography variant="body2">{(station.distance / 1000).toFixed(2)} km</Typography>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDirection(station.geometry.location);
                  }}
                >
                  {t('places.getDirections')}
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Typography variant="h5">{t('places.safeHouses')}</Typography>
            <Button variant="contained" style={{ marginTop: '10px' }} onClick={() => {navigate(`/viewsafehouses?lat=${selected?.lat}&lng=${selected?.lng}`)}}>
            {t('places.findSafeHouse')}
            </Button>
         </div>
        </div>
      )}
    </Container>
  );
};

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setSelected, setSearchInput }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  return (
    <Autocomplete
      freeSolo
      disableClearable
      disabled={!ready}
      options={status === "OK" ? data.map((suggestion) => suggestion.description) : []}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue || '', false);
        setSearchInput(newValue);
        clearSuggestions();
        if (!newValue) return;
        getGeocode({ address: newValue })
          .then(results => getLatLng(results[0]))
          .then(({ lat, lng }) => setSelected({ lat, lng }))
          .catch(error => console.error("Error: ", error));
      }}
      onInputChange={(_, newInputValue) => setValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search an address"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!ready ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Places;