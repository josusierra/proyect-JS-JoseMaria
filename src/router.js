import { Home } from './views/Home';
import { About } from './views/About';
import { NotFound } from './views/Error';
import { List } from './views/List';
import { Detail } from './views/Detail';

export function router() {
    const view = document.getElementById('view');
    const route = location.hash.slice(1).toLowerCase() || '/';

    const routes = {
        '/': Home,
        '/about': About,
        '/list': List
    };

    // /detail/:id
    if (route.startsWith('/detail/')) {
        const id = route.split('/')[2];
        view.innerHTML = Detail(id);
        return;
    }

    const screen = routes[route] || NotFound;
    view.innerHTML = screen();
}
