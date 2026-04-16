import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, MenuItem, Snackbar, Alert } from '@mui/material';
import { Roles } from '../models/Roles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Define the structure for guide data
interface GuideData {
  _id?: string;
  title: string;
  image?: string;
  content: string;
}

const GuideForm: React.FC = () => {
  // State for storing a single guide's data
  const [guideData, setGuideData] = useState<GuideData>({ title: '', content: '' });
  // State for storing array of guides fetched from the server
  const [guides, setGuides] = useState<GuideData[]>([]);
  // State to track the selected guide's ID for editing
  const [selectedGuide, setSelectedGuide] = useState<string>('');
  // State to determine if the form is being used to update an existing guide
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  // Snackbar visibility state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  // Snackbar message state
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  // Severity type for snackbar alerts (success or error)
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation('guideform');



// Effect hook to fetch guide data on component mount
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get<GuideData[]>('http://localhost:3000/guides/guides');
        setGuides(response.data);
      } catch (error: unknown) {
        console.error('Error fetching guides:', error);
      }
    };
    if (user.role === Roles.USER) {
      navigate('/home')
    }

    fetchGuides();
  }, [user.role]);


  // Handle form fields change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuideData({ ...guideData, [event.target.name]: event.target.value });
  };

// Handle selection of a guide to edit
  const handleSelectGuide = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.value;
    if (selectedId === "") {
      setSelectedGuide("");
      setGuideData({ title: "", image: "", content: "" });
      setIsUpdating(false);
    } else {
      const selectedGuideData = guides.find(guide => guide._id === selectedId);
      if (selectedGuideData) {
        setSelectedGuide(selectedId);
        setGuideData(selectedGuideData);
        setIsUpdating(true);
      }
    }
  };
// Handle form submission for creating or updating guides
  const handleSubmit = async () => {
    try {
      if (isUpdating) {
        await axios.put(`http://localhost:3000/guides/guides/${selectedGuide}`, guideData);
        setSnackbarMessage('Guide updated successfully!');
        setSnackbarSeverity('success');
      } else {
        await axios.post('http://localhost:3000/guides/guides', guideData);
        setSnackbarMessage('Guide created successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
      navigate('/home');
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error) ? (error.response?.data || error.message) : 'An unexpected error occurred';
      setSnackbarMessage(`Failed to ${isUpdating ? 'update' : 'create'} guide: ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ marginTop: 4, padding: 3 }}>
      <TextField
        select
        fullWidth
        variant="outlined"
        label={t('guideForm.selectGuideLabel')}
        value={selectedGuide}
        onChange={handleSelectGuide}
        sx={{ marginBottom: 3 }}
      >
        <MenuItem value="">{t('none')}</MenuItem>
        {guides.map(guide => (
          <MenuItem key={guide._id} value={guide._id}>
            {guide.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        variant="outlined"
        label={t('guideForm.titleInputLabel')}
        name="title"
        value={guideData.title}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label={t('guideForm.imageUrlInputLabel')}
        name="image"
        value={guideData.image || ''}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label={t('guideForm.contentInputLabel')}
        name="content"
        multiline
        rows={10}
        value={guideData.content}
        onChange={handleChange}
        sx={{ marginBottom: 3 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isUpdating ? t('guideForm.updateGuideButton') : t('guideForm.createGuideButton')}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GuideForm;
