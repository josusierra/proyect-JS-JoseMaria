import { fetchPokemons } from "../services/pokeService.js";

export function List() {
    setTimeout(loadList, 0);

    return `
        <section class="list">
            <h1>Pokédex</h1>
            <div id="pokemon-list">
                <p>Cargando pokémon...</p>
            </div>
        </section>
    `;
}

async function loadList() {
    const container = document.getElementById("pokemon-list");

    try {
        //40 primeros
        const data = await fetchPokemons(40, 0);

        container.innerHTML = data.results.map((p) => createCard(p));

    } catch (err) {
        container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
}

function createCard(pokemon) {
    //id dentro de url
    const id = pokemon.url.split("/").filter(Boolean).pop();

    return `
        <article class="pokemon-card">
            <a href="#/detail/${id}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}"/>
                <h3>${pokemon.name}</h3>
            </a>
        </article>
    `;
}
