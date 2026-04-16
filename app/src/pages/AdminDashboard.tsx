import { Container, Row, Col } from 'react-bootstrap';
import IncidentStats from './IncidentsBarGraph';
import IncidentPieChart from './IncidentsPieChart';
import IncidentMap from './IncidentsMap';
import SafeHouseHeatMap from './SafeHouseHeatMap';
import { Button } from 'react-bootstrap';
import './../Home.css';
import { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation('admindashboard');
  const dashboardRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === Roles.USER) {
      navigate('/home')
    }
  }, [user.role])


const downloadPdfDocument = () => {
  const input = dashboardRef.current;
  
  html2canvas(input, { scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('dashboard.pdf');
    })
    .catch((error) => {
      console.error('An error occurred during PDF generation', error);
    });
};

  return (
    <Container fluid style={{ gap: '10px', padding: '10px' }}>

     <Row>
        <Col >
          <Button  className="pdfButton" onClick={downloadPdfDocument} style={{
        backgroundColor: '#307277', // Change to your preferred color
        color: '#fff', // Text color
        fontSize: '1rem', // Adjust the font size as needed
        padding: '10px 20px', // Adjust the padding as needed for size
      }}>Download PDF</Button>
        </Col>
      </Row>

        <h2 className='dashboard-header' ref={dashboardRef}>{t('dashboard.tile')}</h2>

        <Container className='document-pdf' ref={dashboardRef}>
        {/* Incident Types and Statistics Side by Side */}
        <Row className="mb-3"> {/* mb-3 for margin-bottom */}
          <Col md={6} className="graph-container">
            <IncidentStats />
          </Col>
          <Col md={6} className="graph-container">
            <IncidentPieChart />
          </Col>
        </Row>

        {/* Incident Map */}
        <Row className="mb-3">
          <Col md={12} className="graph-container">
            <IncidentMap />
          </Col>
        </Row>

        {/* Safe Houses Map */}
        <Row>
          <Col md={12} className="graph-container">
            <SafeHouseHeatMap />
          </Col>
        </Row>

        </Container>

      

    </Container>
  );
};

export default Dashboard;









