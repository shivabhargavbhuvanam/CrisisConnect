
import { Box, CssBaseline, Typography, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useClerk } from '@clerk/clerk-react';

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export function LandingPageContent() {
  const { t } = useTranslation('landingpagecontent');
  const clerk = useClerk()
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await clerk.signOut();
        // Check if 'shownLocationModal' exists in localStorage before removing
        if (localStorage.getItem('shownLocationModal') !== null) {
          localStorage.removeItem('shownLocationModal');  // Only remove if it exists
        }
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    };

    handleSignOut();
  }, [user.username])

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 64px)',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Left half with animated logo and tagline */}
        <Box
          sx={{
            width: '70%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            animation: `${slideFromLeft} 1.5s ease-out`,
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#231d30', // Dark mauve color
              fontSize: '100px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            {t('landingPage.title')}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'medium',
              color: 'black', // Lighter shade of the title color
              fontSize: '40px', // Adjust size accordingly
              marginTop: '20px', // Space between title and tagline
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {t('landingPage.tagline')}
          </Typography>
        </Box>

        {/* Right half with image  */}
        <Box
          component="img"
          src="logos/bkg4.png"
          sx={{
            width: '50%',
            height: '60%',
            objectFit: 'cover',
            animation: `${slideFromRight} 1.5s ease-out`,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: '1fr 3fr' },
          gap: 0,
          alignItems: 'stretch',
          padding: 3,
          marginBottom: 8,
        }}
      >
        {/* First tile on the left */}
        <Paper elevation={3} sx={{ backgroundColor: ' #F3D7CA', '&:hover': { backgroundColor: '#e0e0e0'} }}>
          <Box p={2} textAlign="center">
            <Box
              component="img"
              src="logos/what.png"
              sx={{ width: 120, height: 100 }}
            />
            {/* <Typography variant="h6"style {{ fontWeight: 'bold', color: '#333' }}  Services > </Typography> */}

            <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '45px' }}>
               {t('landingPage.services.title')}
            </Typography>

            <Typography>{t('landingPage.services.description')}</Typography>
          </Box>
        </Paper>

        {/* Grid for the other four tiles */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 0,
            height: '100%',
          }}>

          {/* Tile 2 */}
          <Paper elevation={3} sx={{ backgroundColor: '#FFEFEF', minHeight: '340px', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transform: 'scale(1.05)', transition: 'transform 0.5s, box-shadow 0.5s', } }}>
            <Box p={2} textAlign="center">
              <Box
                component="img"
                src="logos/siren.png"
                sx={{ width: 120, height: 100 }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '35px' }}>{t('landingPage.emergencyResponse.title')}</Typography>
              <Typography>{t('landingPage.emergencyResponse.description')}</Typography>
            </Box>
          </Paper>
          {/* Tile 3 */}

          <Paper elevation={3} sx={{ backgroundColor: '#FEECE2', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transform: 'scale(1.05)', transition: 'transform 0.5s, box-shadow 0.5s', } }}>
            <Box p={2} textAlign="center">
              <Box
                component="img"
                src="logos/homelove.png"
                sx={{ width: 120, height: 100 }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '35px' }}>{t('landingPage.safeHouse.title')}</Typography>
              <Typography>{t('landingPage.safeHouse.description')}</Typography>
            </Box>
          </Paper>
          {/* Tile 4 */}
          <Paper elevation={3} sx={{ backgroundColor: '#BED7DC', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transform: 'scale(1.05)', transition: 'transform 0.5s, box-shadow 0.5s', } }}>
            <Box p={2} textAlign="center">
              <Box
                component="img"
                src="logos/health.png"
                sx={{ width: 120, height: 100 }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '35px' }}>{t('landingPage.rescueGuidelines.title')}</Typography>
              <Typography>{t('landingPage.rescueGuidelines.description')}</Typography>
            </Box>
          </Paper>
          {/* Tile 5 */}
          <Paper elevation={3} sx={{ backgroundColor: '#E8EFCF', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transform: 'scale(1.05)', transition: 'transform 0.5s, box-shadow 0.5s', } }}>
            <Box p={2} textAlign="center">
              <Box
                component="img"
                src="logos/handsconect.png"
                sx={{ width: 120, height: 100 }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '35px' }}>{t('landingPage.loveForHumanity.title')}</Typography>
              <Typography>{t('landingPage.loveForHumanity.description')}</Typography>
            </Box>
          </Paper>



        </Box>
      </Box>

    </>
  );
}