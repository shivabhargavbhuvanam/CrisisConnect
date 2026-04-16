import React from 'react';
import { Card, CardMedia, Typography, CardActionArea, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  guide: {
    _id: string;
    title: string;
    image?: string;
  }
}

const GuideCard: React.FC<Props> = ({ guide }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('helpassistance');

  const handleLearnMoreClick = () => {
    navigate(`/guides/${guide._id}`);
  };

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: 'auto', marginTop: 20, marginBottom: 20 }}>
      <Card raised style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0' }}>
        <CardActionArea onClick={handleLearnMoreClick} style={{ width: '100%' }}>
          {guide.image && (
            <CardMedia
              component="img"
              height="180"  // Increased height for better visual impact
              image={guide.image}
              alt={guide.title}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          )}
          <Typography gutterBottom variant="h5" component="h2" style={{ padding: '16px' }}>
            {guide.title}
          </Typography>
        </CardActionArea>
        {/* <Button 
          onClick={handleLearnMoreClick} 
          style={{ margin: '16px', width: '90%' }} 
          variant="contained" 
          color="primary"
        >
          {t('guidecards.learn')}
        </Button> */}
      </Card>
    </div>
  );
};

export default GuideCard;
