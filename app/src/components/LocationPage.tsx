import { USStates } from '../models/StateInfo';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as userService from '../services/user-service';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { Roles } from '../models/Roles';
import { useTranslation } from 'react-i18next';

type locationPageProps = {
  close: () => void
}

export function LocationPage({close}: locationPageProps) {

  const [selectedState, setSelectedState] = useState('');
  const { user } = useUser();
  const dispatch = useDispatch();
  const { t } = useTranslation('locationmodal');

  const handleStateChange = (event: any) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    console.log('Selected State:', selectedState);
    if (user?.username) {
      userService.updateUserLocation(user.username, selectedState)
                  .then((result) => {
                    dispatch(setUser({ 
                    username: user?.username,
                    emailAddress: user?.emailAddresses[0]?.emailAddress,
                    role: user?.username === 'crisis-connect-admin' ? Roles.ADMIN : Roles.USER,
                    location: result.data.location
                  })); 
                  close();
                })
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{boxShadow: 'none', marginTop: '0'}}>
        <Form.Group className="mb-3">
          <Form.Label>{t('modal.label')}</Form.Label>
          <Form.Control as="select" value={selectedState} onChange={handleStateChange}>
              <option value="">{t('modal.entry')}</option>
              {Object.entries(USStates).map(([state, abbreviation]) => (
                  <option key={state} value={state}>{abbreviation}</option>
              ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" style={{backgroundColor: '#307277'}}>
          {t('btn.save')}
        </Button>
        <Button variant="secondary" className='ms-2' onClick={close}>
          Ignore
        </Button>
      </Form>
    </>
  )
}

// type locationPageProps = {
//   isLoaded: boolean
// }

// const LocationPage = ({isLoaded}: locationPageProps) => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [location, setLocation] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
//   const [savedLocation, setSavedLocation] = useState('');
  

//   // Autocomplete configuration
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     debounce: 300 
//   });


//   const handleInputChange = (_: React.SyntheticEvent, newValue: string | null): void => {
//     setValue(newValue ?? '', true);
//   };

//   const handleAutocompleteChange = (_: React.SyntheticEvent, newValue: string | null): void => {
//     setValue(newValue ?? '', false);
//     clearSuggestions();
//     if (!newValue) return;
//     getGeocode({ address: newValue })
//       .then(results => getLatLng(results[0]))
//       .then((latLng: google.maps.LatLngLiteral) => {
//         setSelectedLocation(latLng);
//         setLocation(newValue);
//       })
//       .catch(error => console.error("Error: ", error));
//   };

//   // Fetch location from backend
//   useEffect(() => {
//     if (user) {
//       fetch(`http://localhost:3000/location/${user.id}`)
//         .then(response => response.json())
//         .then(data => {
//           if (data.location) {
//             setSavedLocation(data.location);
//             setLocation(data.location); // Update input field and marker
//             getGeocode({ address: data.location })
//               .then(results => getLatLng(results[0]))
//               .then(latLng => setSelectedLocation(latLng));
//           }
//         })
//         .catch(error => console.error('Error fetching location:', error));
//     }
//   }, [user]);

//   // Save location to backend
//   const handleSaveLocation = async () => {
//     if (!location) {
//       alert('Please enter a location');
//       return;
//     }
  
//     setSaving(true);
//     try {
//       const userDetails = {
//         userId: user?.id,
//         location,
//         username: user?.username,
//         firstName: user?.firstName,
//         lastName: user?.lastName,
//         emailAddress: user?.emailAddresses[0].emailAddress,
//       };
  
//       const response = await fetch('http://localhost:3000/location', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userDetails)
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setSavedLocation(data.location);
//         alert('Location saved successfully!');
//       } else {
//         throw new Error('Failed to save location');
//       }
//     } catch (error) {
//       console.error('Failed to save location', error);
//       alert('Failed to save location');
//     } finally {
//       setSaving(false);
//     }
//   };
//   return (
//     <div>
//       <Typography variant="h4">Enter Location</Typography>
//       <Autocomplete
//         freeSolo
//         disableClearable
//         options={status === "OK" ? data.map(suggestion => suggestion.description) : []}
//         value={value}
//         onChange={handleAutocompleteChange}
//         onInputChange={handleInputChange}
//         renderInput={(params: AutocompleteRenderInputParams) => (
//           <TextField {...params} label="Location" fullWidth variant="outlined" margin="normal" placeholder="Enter your location" />
//         )}
//       />
//       <Box display="flex" justifyContent="center" mt={2}>
//         <Button variant="contained" color="primary" onClick={handleSaveLocation} disabled={saving}>
//           {saving ? 'Saving...' : 'Save Location'}
//         </Button>
//         <Button variant="contained" onClick={() => navigate('/')} sx={{ ml: 2 }}>
//           Cancel
//         </Button>
//       </Box>
//       {isLoaded && selectedLocation && (
//         <div style={{ height: '400px', width: '100%', marginTop: '10px' }}>
//           <GoogleMap
//             zoom={12}
//             center={selectedLocation}
//             mapContainerStyle={{ width: '100%', height: '100%' }}
//           >
//             <Marker position={selectedLocation} />
//           </GoogleMap>
//         </div>
//       )}
//       <Typography variant="body1" style={{ marginTop: '10px' }}>
//         Saved Location: {savedLocation}
//       </Typography>
//     </div>
//   );
// };

// export default LocationPage;

