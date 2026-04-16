import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Paper, Snackbar, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { MdArrowBack } from 'react-icons/md';

interface Guide {
  _id: string;
  title: string;
  image?: string;
  content: string;
}

const GuideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/guides/guides/${id}`);
        setGuide(response.data);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError('Failed to fetch guide details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    );
  }

  if (!guide) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">Guide not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Button className="back-btn" onClick={() => navigate(-1)}>
        <span className="icon-circle">
          <MdArrowBack /> Back
        </span>
      </Button>
      <Paper elevation={3} sx={{ p: 4, margin: 'auto', maxWidth: 960, flexGrow: 1 }}>
        <Typography variant="h3" gutterBottom component="h1" sx={{ fontWeight: 'bold' }}>
          {guide.title}
        </Typography>
        {guide.image && (
          <Box mt={2} mb={3} display="flex" justifyContent="center">
            <img src={guide.image} alt={guide.title} style={{ height: '500px', width: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          </Box>
        )}
        <Typography variant="body1" paragraph sx={{ lineHeight: '1.6', textIndent: '20px', textAlign: 'justify' }}>
          {guide.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Paper>
    </>
    
  );
};

export default GuideDetails;
