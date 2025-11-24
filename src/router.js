import { Home } from './views/Home';
import { About } from './views/About';
import { NotFound } from './views/Error';
import { List } from './views/List';

export function router() {
    const view = document.getElementById('view');
    const route = location.hash.slice(1).toLowerCase() || '/';
    const routes = {
        '/': Home,
        '/about': About,
        '/list': List
    };
    const screen = routes[route] || NotFound;
    view.innerHTML = screen();
}