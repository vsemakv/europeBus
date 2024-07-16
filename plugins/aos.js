import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ app }) => {
    setTimeout(function() {
        app.AOS = new AOS.init({
            once: true,
            startEvent: 'DOMContentLoaded',
            offset: 1
        });
    }, 100);
};
