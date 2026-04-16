import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import './Home.css'
import IncidentForm from './pages/IncidentForm'
import SafeHouseForm from './pages/SafeHouseForm'
import SafeHouseList from './pages/GetAllSafeHouses'
import SafeHouseEditForm from './pages/UpdateSafeHouse'
import Home from './pages/Home'
import { IncidentsAdmin } from './pages/IncidentsAdmin'
import { IncidentDetails } from './pages/IncidentDetails'
import { Incident, IncidentType, SeverityLevel } from './models/Incident'
import IncidentsUser from './pages/IncidentsUser'
import GuideForm from './pages/GuideForm'
import Places from './pages/HelpAssistance'
import ViewSafeHouses from './pages/ViewSafeHouse'
import NoMatch from './components/NoMatch';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage'
import { LandingPageContent } from './pages/LandingPageContent'
import { RequireAuth, RequireNoAuth } from './auth/Auth'
import PaymentForm from './pages/PaymentForm';
import { setUser } from './redux/userSlice'; // Import setUser action
import { useDispatch } from 'react-redux'
import { Roles } from './models/Roles'
import IncidentStats from './pages/IncidentsBarGraph'
import IncidentPieChart from './pages/IncidentsPieChart'
import IncidentMap from './pages/IncidentsMap'
import SafeHouseHeatMap from './pages/SafeHouseHeatMap'
import Dashboard from './pages/AdminDashboard'
import * as userService from './services/user-service';
import GuideList from './pages/GuideList';
import LanguageDropdown from './components/LanguageDropDown';
import GuideDetails from './pages/GuideDetails'; // Assuming this is the component for viewing a single guide

function App() {
    
  const initialIncidentData:Incident = {
                                type: IncidentType['Earth Quake'],
                                details: '',
                                state: '',
                                city: '',
                                address: '',
                                severityLevel: SeverityLevel.Low,
                                reportedBy: 'Unknown User'
                              };

  const dispatch = useDispatch(); // Allows you to dispatch actions to update the Redux store.

  const { isSignedIn, user, isLoaded } = useUser(); // Tracks sign-in status
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded) { // Ensure that we check only after the user's sign-in status is confirmed
      if (!isSignedIn) {
        // Redirect to landing page if not signed in and trying to access any other page
        navigate('/');
      } else if (isSignedIn && location.pathname === '/') {
        userService.getUserLocation(user?.username)
                  .then((result) => {dispatch(setUser({ 
                    username: user?.username,
                    emailAddress: user?.emailAddresses[0]?.emailAddress,
                    role: user?.username === 'crisis-connect-admin' ? Roles.ADMIN : Roles.USER,
                    location: Object.keys(result.data).length === 0 ? null : result.data
                  })); console.log(result.data);})
                // Redirect to home only if signed in and on the landing page
        navigate('/home');
      }
      // If user is signed in and tries to access any specific path, let them proceed
    }
  }, [isLoaded, isSignedIn, navigate, location.pathname]);
  
  return (
    <Routes>
      <Route path='/' Component={LandingPage}>
        <Route index element={<RequireNoAuth><LandingPageContent/></RequireNoAuth>}/>
        <Route path='home' element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path='report-incident' element={<RequireAuth><IncidentForm incident={initialIncidentData} mode="create" /></RequireAuth>}/>
        <Route path='admin/incidents' element={<RequireAuth><IncidentsAdmin/></RequireAuth>}/>
        <Route path='incidents' element={<RequireAuth><IncidentsUser/></RequireAuth>}/>
        <Route path='incidents/:id' element={<RequireAuth><IncidentDetails/></RequireAuth>}/>
        <Route path='/add-safehouse' element={<RequireAuth><SafeHouseForm/></RequireAuth>}/>
        <Route path='/get-safehouses' element={<RequireAuth><SafeHouseList/></RequireAuth>}/>
        <Route path='/update-safehouse/:id' element={<RequireAuth><SafeHouseEditForm/></RequireAuth>}/>
        <Route path="/guides" element={<RequireAuth><GuideList /></RequireAuth>} />  // Ensure this component exists to list guides
        <Route path="/guide-form" element={<RequireAuth><GuideForm /></RequireAuth>} />  // Ensure this component exists for creating/updating guides
        <Route path="/guides/:id" element={<RequireAuth><GuideDetails /></RequireAuth>} />  // Dynamic route for individual guides
        <Route path='/bargraph' element={<RequireAuth><IncidentStats/></RequireAuth>}/>
        <Route path='/payment' element={<RequireAuth><PaymentForm /></RequireAuth>} />
        <Route path='/assistance' element={<RequireAuth><Places/></RequireAuth>}/>
        <Route path='/piechart' element={<RequireAuth><IncidentPieChart/></RequireAuth>}/>
        <Route path='/incidentmap' element={<RequireAuth><IncidentMap></IncidentMap></RequireAuth>}/>
        <Route path='/viewsafehouses' element={<RequireAuth><ViewSafeHouses/></RequireAuth>} />
        <Route path='/safehousemap' element={<RequireAuth><SafeHouseHeatMap></SafeHouseHeatMap></RequireAuth>}/>
        <Route path='/admin-dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/>
        {/* <Route path="/layout" element={<Layout />}>
              <Route path="helloworld" element={<HelloWorld />} />
              <Route path="places" element={<Places />} />
              <Route path="location" element={<LocationPage />} />
        </Route> */}
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
