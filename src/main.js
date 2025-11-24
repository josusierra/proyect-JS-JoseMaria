import { router } from './router.js';
import { Navbar } from './components/Navbar.js';
import './styles/style.css';


const app = document.querySelector('#app');

app.innerHTML = `
${Navbar()}
  <main id="view"></main>
`;

router();
window.addEventListener('hashchange', router);