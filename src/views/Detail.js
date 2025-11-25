import { fetchPokemonByNameOrId } from "../services/pokeService.js";

export function Detail(id) {

    setTimeout(() => loadPokemon(id), 0);

    return `
        <section class="detail">
            <div id="detail-content">
                <p>Cargando Pokémon...</p>
            </div>
        </section>
    `;
}

async function loadPokemon(id) {
    const container = document.getElementById("detail-content");

    try {
        const p = await fetchPokemonByNameOrId(id);

        container.innerHTML = `
            <article class="pokemon-detail-card">
                <h1>${p.name} <small>#${p.id}</small></h1>

                <img src="${p.sprites.front_default}" 
                     alt="${p.name}" 
                     width="150" 
                     height="150"/>

                <p><strong>Tipos:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>Altura:</strong> ${p.height}</p>
                <p><strong>Peso:</strong> ${p.weight}</p>

                <a class="btn" href="#/list">Volver</a>
            </article>
        `;
    } catch (error) {
        container.innerHTML = `
            <p class="error">Error: ${error.message}</p>
            <a class="btn" href="#/list">Volver</a>
        `;
    }
}