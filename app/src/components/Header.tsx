import { AppBar, Toolbar, Button, Box, Typography} from '@mui/material';
import { FC } from 'react';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Roles } from '../models/Roles';
import LanguageDropdown from './LanguageDropDown';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';



const SignUpButton: FC = () => {
  const clerk = useClerk();
  const { t } = useTranslation('header');

  return (
    <Button
      sx={{
        color: 'black',            // Sets the text color
        fontSize: '1.1rem',        // Sets the font size
        fontFamily: 'Montserrat',  // Sets the font family
        fontWeight: 'bold',        // Sets the font weight
        letterSpacing: '0.05em',   // Sets the letter spacing
        textTransform: 'none'      // Disables uppercase transformation
      }}
      onClick={() => clerk.openSignUp({})}
    >
      {t('button.signUp')}
    </Button>
  );
};

const SignInButton: FC = () => {
  const clerk = useClerk();
  const { t } = useTranslation('header');
  return (
    <Button
      sx={{
        color: 'black',
        fontSize: '1.1rem',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        textTransform: 'none'
      }}
      onClick={() => clerk.openSignIn({})}
    >
      {t('button.signIn')}
    </Button>
  );
};


const NavLink: FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <Typography
    sx={{
      margin: '0 15px',
      color:   isActive? '#95AF59' : 'black',
      fontSize: '1.1rem',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'color 0.3s ease-in-out',
      '&:hover': {
        textDecoration: 'none',
        color: '#95AF59'
      },
      '&:a.active': {
        color: '#95AF59'
      },
    }}
    onClick={onClick}
  >
     {label}
  </Typography>
);

const Header: FC = () => {

  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation('header');

  // Handler for your nav links
  const handleNavigation = (path: string) => {
      navigate(path);
  };

  return (
    <AppBar className='mb-2'
      position="static"
      sx={{
        backgroundColor: 'white', // Use your desired color here
        boxShadow: 'none',
      }}
      elevation={0}
    >
      <Toolbar>
        {/* Logo on the top left */}
        <Box component="img" src="logos/Logo.png" sx={{ height: 64, width: 'auto', cursor: 'pointer' }} onClick={() => handleNavigation('/')} />

        <Box sx={{ flexGrow: 1 }} />  

        <SignedIn>
          {/* Navigation Links */}
          <LanguageDropdown/>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink isActive={location.pathname === '/home'} label={t('navLink.home')} onClick={() => handleNavigation('/home')}/>
            {
              user.role === Roles.USER 
              ?
              <>
                <NavLink isActive={location.pathname === '/report-incident'} label={t('navLink.reportIncident')} onClick={() => handleNavigation('/report-incident')} />
                <NavLink isActive={location.pathname === '/incidents'} label={t('navLink.viewIncidents')} onClick={() => handleNavigation('/incidents')} />
                <NavLink isActive={location.pathname === '/assistance'} label={t('navLink.help')} onClick={() => handleNavigation('/assistance')} />
                <NavLink isActive={location.pathname === '/guides'} label={t('navLink.guides')} onClick={() => handleNavigation('/guides')} />
              </>
              :
              <>
                <NavLink isActive={location.pathname === '/admin/incidents'} label={t('navLink.viewIncidents')} onClick={() => handleNavigation('/admin/incidents')} />
                <NavLink isActive={location.pathname === '/admin-dashboard'} label={t('navLink.dashboard')} onClick={() => handleNavigation('/admin-dashboard')} />
                <NavLink isActive={location.pathname === '/get-safehouses'} label={t('navLink.safeHouses')} onClick={() => handleNavigation('/get-safehouses')} />
                <NavLink isActive={location.pathname === '/guide-form'} label={t('navLink.createGuides')} onClick={() => handleNavigation('/guide-form')} />
              </>
            }
            
            
            
            
          </Box>
          

          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignUpButton />
          <SignInButton />
        </SignedOut>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
