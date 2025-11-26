import { fetchPokemons } from "../services/pokeService.js";

let currentPage = 0;
const pageSize = 6;

export function List() {
    setTimeout(loadList, 0);

    return `
        <section class="list">
            <h1>Pokédex</h1>
            <div id="pokemon-list">
                <p>Cargando pokémon...</p>
            </div>


            <div class="pagination">
                <button id="prev-btn" class="btn" disabled>Anterior</button>
                <button id="next-btn" class="btn">Siguiente</button>
            </div>

        </section>
    `;
}

function createCard(pokemon) {
    //id dentro de url
    const id = pokemon.url.split("/").filter(Boolean).pop();

    return `
        <article class="pokemon-card">
            <a href="#/detail/${id}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}"/>
                <h2>${pokemon.name}</h2>
            </a>
        </article>
    `;
}

// async function loadList() {
//     const container = document.getElementById("pokemon-list");

//     try {
//         //40 primeros
//         const data = await fetchPokemons(40, 0);

//         container.innerHTML = data.results.map((p) => createCard(p));

//     } catch (err) {
//         container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
//     }
// }

async function loadList() {
    const container = document.getElementById("pokemon-list");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    try {
        const offset = currentPage * pageSize;

        const data = await fetchPokemons(pageSize, offset);

        container.innerHTML = data.results.map((p) => createCard(p)).join("");

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = data.results.length < pageSize;

        prevBtn.onclick = () => {
            if (currentPage > 0) {
                currentPage--;
                loadList();
            }
        };

        nextBtn.onclick = () => {
            currentPage++;
            loadList();
        };

    } catch (err) {
        container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
}