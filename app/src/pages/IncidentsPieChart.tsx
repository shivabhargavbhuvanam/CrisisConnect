import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as IncidentsService from '../services/incident-service';
import { Incident } from "../models/Incident";
import { useTranslation } from 'react-i18next';

// Register the components you need from Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ChartData {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }>;
  }

const IncidentPieChart = () => {
  const { t } = useTranslation('admindashboard');
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  });
  const [error, setError] = useState('');


  useEffect(() => {
    IncidentsService.getAllIncidents()
      .then(response => response.data)
      .then(data => {
        const typeCounts = data.reduce((acc, incident: Incident) => {
          acc[incident.type] = (acc[incident.type] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(typeCounts),
          datasets: [{
            data: Object.values(typeCounts),
            backgroundColor: [
              'rgba(0, 51, 102, 0.8)',
              'rgba(34, 139, 34, 0.8)',
              'rgba(220, 20, 60, 0.8)',
              'rgba(255, 140, 0, 0.8)'
            ],
            borderColor: [
              'rgba(0, 51, 102, 1)',
              'rgba(34, 139, 34, 1)',
              'rgba(220, 20, 60, 1)',
              'rgba(255, 140, 0, 1)'
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(err => {
        setError('Error fetching incidents: ' + err.message);
        console.error('Error while fetching incidents:', err);
      });
  }, []);

  const options = {
    maintainAspectRatio: false, // Allows the chart to fill the container
    responsive: true, // Makes the chart responsive to the container size
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40%',
      height: '40vh',
      margin: 'auto',
      marginTop: '50px'
    }}>
      <h2>{t('incidentpiechart.title')}</h2>
      <Pie 
      data={chartData}
      options={options} 
      />
    </div>
  );
};

export default IncidentPieChart;