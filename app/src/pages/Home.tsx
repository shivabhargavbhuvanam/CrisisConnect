
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { Roles } from "../models/Roles";
import LocationModal from "../components/LocationModal";
import { useEffect, useState } from "react";
import CrisisConnectBot from '../components/CrisisConnectBot';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
// import Footer from "../components/Footer";


function Home() {
  const { t } = useTranslation('home');
    const user = useSelector((state: RootState) => state.user);
    const [showLocationModal, setShowLocationModal] = useState(false);

    // Create a reference to the tiles container
    const tilesRef = useRef<HTMLDivElement>(null);

    // Function to handle click on 'Get Started' button
    // const scrollToTiles = () => {
    //    tilesRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    const scrollToTiles = () => {
        if (tilesRef.current) {
          const offset = -390; 
          const position = tilesRef.current.offsetTop + offset;
          // Using window.scrollTo for a more controlled scroll experience
          window.scrollTo({
            top: position,
            behavior: 'smooth'
          });
        }
      };

      const scrollToVolunteers = () => {
        // Prevent the default anchor behavior
        
        // Find the volunteer section
        const volunteersSection = document.getElementById('volunteers');
        
        // Scroll to the volunteer section
        // volunteerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      
  

  const volunteers = [
    {
      name: 'Sai Priya ',
      role: 'Developer',
      description: 'aspiring WEBD TA',
      image: 'logos/priya.png',
      socials: [
        { type: 'facebook', link: 'https://facebook.com/jasmin' },
        // ...other socials
      ],
    },
    {
        name: 'Akash',
        role: 'Developer',
        description: 'aspiring WEBD TA',
        image: 'logos/varun.png',
        socials: [
          { type: 'facebook', link: 'https://facebook.com/jasmin' },
          // ...other socials
        ],
      },
      {
        name: 'Chaitanya',
        role: 'Developer',
        description: 'aspiring WEBD TA',
        image: 'logos/chaitu.png',
        socials: [
          { type: 'facebook', link: 'https://facebook.com/jasmin' },
          // ...other socials
        ],
      },
      {
        name: 'Siddhartha',
        role: 'Developer',
        description: 'aspiring WEBD TA',
        image: 'logos/siddu.png',
        socials: [
          { type: 'facebook', link: 'https://facebook.com/jasmin' },
          // ...other socials
        ],
      }
    // ...other volunteers
  ];
    
      useEffect(() => {
          // To show the update location popup only once after a user logs in, showLocationModal property is set
          // in the storage. Value of this property is further used to restrict the modal to open (once opened)
          const showModal = localStorage.getItem('showLocationModal') === 'true' || false;
          // Show Update Location popup, only once after logging in and only if a user has logged in (not admin) 
          if(user.role === Roles.USER && !showModal) {
              const timer=  setTimeout(() => {
                  setShowLocationModal(true);
                  localStorage.setItem('showLocationModal', 'true');  // Set local storage to prevent future triggers
              }, 1000);
          
              return () => clearTimeout(timer);
          }
      });

      const handleCloseModal = () => {
          setShowLocationModal(false);
      };
      
    
    return (
        <>
            {/* Conditionally render the hero section based on the user's role */}
            {user.role !== Roles.ADMIN && (
                <div className="hero-section">
                    <div className="text-container">
                        <h1>{t('home.title.label1')} <br /> {t('home.title.label2')}</h1>
                        <p>{t('hero-section.description')}</p>
                        <button onClick={scrollToTiles}>{t('button.get-started')}</button>
                    </div>
                    <div className="image-container">
                        <img src="logos/heropg_img1.png" alt="Disaster Help" />
                    </div>
                </div>
            )}

            {showLocationModal && <div className="overlay" onClick={handleCloseModal}></div>}
            <div className="crisisConnectBot-container">
                <CrisisConnectBot />
            </div>


            <header className="welcome-header" ref={tilesRef}>
                <h1>{t('header.welcome')} {user.username} </h1>
                <p className="tagline">{t('header.tagline')}</p>
            </header>

            {user.role === Roles.ADMIN ?
                <div className="home-container" style={{ minHeight: '470px', marginTop: '0px' }}>
                    <Link to="/admin/incidents" className="home-box">
                        <div className="home-box-content">
                            <img src="logos/incidentlist1.png" alt="Guides" />
                            <span>{t('admin.incidents')}</span>
                        </div>
                    </Link>
                    <Link to="/get-safehouses" className="home-box">
                        <div className="home-box-content">
                            <img src="logos/safehouse-1.png" alt="Guides" style={{ width: '300px', height: 'auto' }}/>
                            <span>{t('admin.safehouses')}</span>
                        </div>
                    </Link>
                    <Link to="/guide-form" className="home-box">
                        <div className="home-box-content">
                            <img src="logos/guidelist-2.png" alt="Donation" />
                            <span>{t('user.guides')}</span>
                        </div>
                    </Link>
                    <Link to="/admin-dashboard" className="home-box">
                        <div className="home-box-content">
                            <img src="logos/dashboard.png" alt="Guides" style={{ width: '200px', height: 'auto' }}/>
                            <span>{t('admin.dashboard')}</span>
                        </div>
                    </Link>
                </div>
                :

                <>
                    <div className="home-container" ref={tilesRef}>
                        <Link to="/report-incident" className="home-box">
                            <div className="home-box-content">
                                <img src="logos/report-1.png" alt="Report Incident" />
                                <span>{t('user.report-incident')}</span>
                            </div>
                        </Link>

                        <Link to="/incidents" className="home-box">
                            <div className="home-box-content">
                                <img src="logos/incidentlist1.png" alt="Incident list" />
                                <span>{t('user.incidents')}</span>
                            </div>
                        </Link>


                        <Link to="/guides" className="home-box">
                            <div className="home-box-content">
                                <img src="logos/guidelist-2.png" alt="Donation" />
                                <span>{t('user.guides')}</span>
                            </div>
                        </Link>

                        <Link to="/assistance" className="home-box">
                            <div className="home-box-content">
                                <img src="logos/helpline.png" alt="Report Incident" />
                                <span>{t('user.help')}</span>
                            </div>
                        </Link>
                    </div>



                    {/* Donation Section */}
                    <div className="donation-section" style={{ minHeight: '600px' }}>
                        <div className="donation-content">
                            <h2>{t('donation-section.title')}</h2>
                            <p>{t('donation-section.description')}</p>
                            <Link to="/payment" className="donate-button">{t('button.donate-now')}</Link>
                        </div>
                        <div className="donation-image-container">
                            <img src="logos/donate.png" alt="Syria Emergency" />
                        </div>
                    </div>

                    {/* Volunteer Section */}
                    <div className="volunteer-section" id="volunteers">
                        <h2>{t('volunteer-section.title')}</h2>
                        <div className="volunteers-container">
                            {/* Here we map through the volunteers data and display each volunteer */}
                            {volunteers.map((volunteer, index) => (
                                <div className="volunteer-card" key={index}>
                                    <img src={volunteer.image} alt={volunteer.name} />
                                    <div className="volunteer-info">
                                        <h3>{volunteer.name}</h3>
                                        <p>{volunteer.role}</p>
                                        <p>{volunteer.description}</p>
                                        {/* Assuming you have a way to display social links */}
                                        {/* ... */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Start of FAQ Section */}
                    <div className="faq-container">
                        <h2>{t('faq.title')}</h2>
                        <details className="faq-item">
                            <summary>{t('faq.question1')}</summary>
                            <p>{t('faq.answer1')}</p>
                        </details>
                        <details className="faq-item">
                            <summary>{t('faq.question2')}</summary>
                            <p>{t('faq.answer2')}</p>
                        </details>
                        <details className="faq-item">
                            <summary>{t('faq.question3')}</summary>
                            <p>{t('faq.answer3')}</p>
                        </details>
                        <details className="faq-item">
                            <summary>{t('faq.question4')}</summary>
                            <p>{t('faq.answer4')}</p>
                        </details>
                    </div>
                    {/* End of FAQ Section */}
                </>
            }
            <LocationModal show={showLocationModal} handleClose={handleCloseModal} />

            {/* Footer */}
            {user.role === Roles.USER && (

                <footer className="footer mt-auto py-3 bg-light">
                    <div className="footer-content">
                        <section className="footer-section">
                            <h4>{t('footer.section1.title')}</h4>
                            <ul>
                                <li><Link to="/report-incident">{t('user.report-incident')}</Link></li>
                                <li><Link to="/guides">{t('user.guides')}</Link></li>
                                <li><Link to="/assistance">{t('user.help')}</Link></li>
                                <li><Link to="/payment">{t('footer.donate')}</Link></li>
                            </ul>
                        </section>

                        <section className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#volunteers" onClick={scrollToVolunteers}>{t('footer.aboutus')}</a></li>
                                <li><Link to="/guides">AI Help  </Link></li>
                                <li><a href="https://www.fema.gov/" target="_blank" rel="noopener noreferrer">FEMA Website</a></li>
                            </ul>
                        </section>

                        <section className="footer-section">
                            <h4>{t('footer.section3.title')}</h4>
                            <p>Email: support@crisiskonect.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </section>

                        <section className="footer-section">
                            <h4>{t('footer.section4.title')}</h4>
                            <div className="footer-icons">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="logos/messenger.png" alt="Facebook" /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="logos/twitter.png" alt="Twitter" /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="logos/linked_in.png" alt="Instagram" /></a>
                            </div>
                        </section>
                    </div> <hr></hr>
                    <div className="website-footer">
                        <div>Copyright @ Xpro 2024. All Rights Reserved.</div>
                    </div>
                </footer>)}
        </>
    );
}




export default Home;

