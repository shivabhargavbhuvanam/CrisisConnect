import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
import * as IncidentsService from '../services/incident-service';
import { Incident } from "../models/Incident";
import { useTranslation } from 'react-i18next';

interface IncidentChartData {
  labels: string[];
  datasets: Chart.Dataset<"bar", number[]>[];
}

// Register the components you need from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncidentStats = () => {
  const [chartData, setChartData] = useState<IncidentChartData>({ labels: [], datasets: [] });
  const [error, setError] = useState('');
  const { t } = useTranslation('admindashboard');

  const containerStyle : React.CSSProperties = {
    width: '70%',  // 50% of the width to cover half the screen width
    height: '70%', // 50% of the height to cover half the screen height
    marginTop: '20px',
    marginLeft: '20px'
  };

  useEffect(() => {
    IncidentsService.getAllIncidents()
      .then(response => response.data)
      .then(data => {
        const statusCounts = { reported: data.length, approved: 0, rejected: 0, ignored: 0 };
        data.forEach((incident: Incident) => {
          if (!incident.action) {
            statusCounts.reported += 1;
          } else {
            statusCounts[incident.action] = (statusCounts[incident.action] || 0) + 1;
          }
        });
        setChartData({
          labels: ['Reported', 'Approved', 'Rejected', 'Ignored'],
          datasets: [{
            label: 'Number of Incidents',
            data: [statusCounts.reported, statusCounts.approved, statusCounts.rejected, statusCounts.ignored],
            backgroundColor: [
                'rgba(65, 105, 225, 0.8)', // Dark grey for Reported
                'rgba(34, 139, 34, 0.8)', // Dark green for Approved
                'rgba(220, 20, 60, 0.8)', // Dark red for Rejected
                'rgba(255, 140, 0, 0.8)' // Dark orange for Ignored
              ],
              borderColor: [
                'rgba(65, 105, 225, 1)', // Stronger grey for Reported
                'rgba(34, 139, 34, 1)', // Stronger green for Approved
                'rgba(220, 20, 60, 1)', // Stronger red for Rejected
                'rgba(255, 140, 0, 1)' // Stronger orange for Ignored
              ],
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 0.75
          }]
        });
      })
      .catch(err => {
        setError(err.message);
        console.error('Error while fetching incidents:', err);
      });
  }, []);

  const options = {
    scales: {
      y: {
        display: true,  // Hides the y-axis numbers and grid lines
        grid: {
          display: false  // Hides y-axis grid lines
        }
      },
      x: {
        grid:{
            display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    maintainAspectRatio: false
  };

  if (error) {
    return <div>Error loading incidents: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>{t('incidentsbar.title')}</h2>
      <Bar
        data={chartData}
        options={options}
        height="100%"  // Make the chart fill the container
      />
    </div>
  );
};

export default IncidentStats;
