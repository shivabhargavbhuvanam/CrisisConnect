import { Modal } from 'react-bootstrap';
import { LocationPage } from './LocationPage';
import { useTranslation } from 'react-i18next';
import { MdLocationOn } from 'react-icons/md';

type locationModalProps = {
    show: boolean,
    handleClose: () => void
}

const LocationModal = ({ show, handleClose }: locationModalProps) => {

    // Load Google Maps script
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    //     libraries: ['places']
    // });
    const { t } = useTranslation('locationmodal');
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className='location-modal-title'>
                    {t('modal.title')} <MdLocationOn />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <LocationPage isLoaded={isLoaded}/> */}
                <LocationPage close={handleClose}/>
            </Modal.Body>
        </Modal>
    );
};

export default LocationModal;
