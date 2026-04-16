import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['home','header','admindashboard','updatesafehouse','viewsafehouses','getallsafehouses','guideform','helpassistance','incidentdetails','incidentform','incidentsadmin','landingpagecontent','locationmodal','paymentform','safehouseform'],
        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;