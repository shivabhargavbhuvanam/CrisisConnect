import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuideCard from './GuideCard';
import { TextField } from '@mui/material';

interface Guide {
  _id: string;
  title: string;
  image?: string;
  content: string;
}

const GuidesList: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get<Guide[]>('http://localhost:3000/guides/guides');
        setGuides(response.data);
        setFilteredGuides(response.data); // Initialize filtered guides
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const results = guides.filter(guide =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuides(results);
  }, [searchTerm, guides]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0px' }}>
        <TextField
          label="Filter by Title"
          variant="outlined"
          style={{ width: '50%' }} // Sets the TextField width to 50% of its container
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredGuides.map(guide => <GuideCard key={guide._id} guide={guide} />)}
      </div>
    </div>
  );
};

export default GuidesList;


