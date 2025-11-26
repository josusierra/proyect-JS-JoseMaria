import { router } from './router.js';
import { Navbar } from './components/navbar.js';
import './styles/style.css'
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";


const app = document.querySelector('#app');

app.innerHTML = `
${Header()}
${Navbar()}
  <main id="view"></main>
${Footer()}
  `;

router();
window.addEventListener('hashchange', router);