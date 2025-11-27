const fav = "favoritos";

export function getFavorites() {
    const data = localStorage.getItem(fav);
    return data ? JSON.parse(data) : [];
}

export function saveFavorites(list) {
    localStorage.setItem(fav, JSON.stringify(list));
}

export function toggleFavorite(id) {
    let favs = getFavorites();

    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);

    } else {
        favs.push(id);
    }

    saveFavorites(favs);
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}