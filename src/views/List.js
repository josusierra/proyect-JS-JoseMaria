import { fetchPokemons } from "../services/pokeService.js";
import { isFavorite, toggleFavorite, getFavorites } from "../utils/favorites.js";

let currentPage = 0;
const pageSize = 9;
let showingFavorites = false;

export function List() {
    setTimeout(loadList, 0);

    return `
        <div class="container mt-4">
            <h1 class="text-center mb-4 text-danger fw-bold">Pokédex</h1>

            <div class="text-center mb-3">
                <button id="toggle-fav-btn" class="btn btn-warning fw-bold"> ⭐ Ver solo favoritos </button>
            </div>

            <div id="pokemon-list" class="row g-4 justify-content-center">
                <p class="text-center">Cargando pokémon...</p>
            </div>

            <div class="d-flex justify-content-center gap-3 mt-4">
                <button id="prev-btn" class="btn btn-secondary" disabled>Anterior</button>
                <button id="next-btn" class="btn btn-primary">Siguiente</button>
            </div>
        </div>
    `;
}

function createCard(pokemon) {
    //id dentro de url
    const id = pokemon.url.split("/").filter(Boolean).pop();
    const star = isFavorite(id) ? "⭐" : "☆";


    return `
        <div class="col-md-4 col-sm-6">
            <div class="card text-center shadow-sm">

                <button class="fav-btn position-absolute top-0 end-0 m-2 btn btn-sm btn-warning" data-id="${id}"> ${star} </button>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top mx-auto d-block mt-3" style="width: 120px;"/>

                <div class="card-body">
                    <h5 class="card-title text-capitalize text-primary">${pokemon.name}</h5>
                    <a href="#/detail/${id}" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>
    `;
    
}

// async function loadList() {
//     const container = document.getElementById("pokemon-list");
//     const prevBtn = document.getElementById("prev-btn");
//     const nextBtn = document.getElementById("next-btn");
//     const toggleFavBtn = document.getElementById("toggle-fav-btn");

//     try {
//         const offset = currentPage * pageSize;

//         const data = await fetchPokemons(pageSize, offset);

//         container.innerHTML = data.results.map((p) => createCard(p)).join("");

//         //fav
//         document.querySelectorAll(".fav-btn").forEach(btn => {
//             btn.addEventListener("click", () => {
//                 const id = btn.dataset.id;
    
//                 toggleFavorite(id);
    
//                 btn.textContent = isFavorite(id) ? "⭐" : "☆";
//             });
//         });


//         prevBtn.disabled = currentPage === 0;
//         nextBtn.disabled = data.results.length < pageSize;

//         prevBtn.onclick = () => {
//             if (currentPage > 0) {
//                 currentPage--;
//                 loadList();
//             }
//         };

//         nextBtn.onclick = () => {
//             currentPage++;
//             loadList();
//         };

//     } catch (err) {
//         container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
//     }
// }

async function loadList() {
    const container = document.getElementById("pokemon-list");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const toggleFavBtn = document.getElementById("toggle-fav-btn");

    try {
        let list = [];

        if (showingFavorites) {
            //fav
            const favIds = getFavorites();
            
            if (favIds.length === 0) {
                container.innerHTML = `
                    <p class="text-center text-warning fs-5">No tienes favoritos aún.</p>
                `;
                return;
            }

            const promises = favIds.map(id => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
            );

            const favData = await Promise.all(promises);

            list = favData.map(p => ({
                name: p.name,
                url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`
            }));


        } else {
            //lista normal
            const offset = currentPage * pageSize;
            const data = await fetchPokemons(pageSize, offset);
            list = data.results;

        }

        container.innerHTML = list.map(p => createCard(p)).join("");

        //fav
        document.querySelectorAll(".fav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;

                toggleFavorite(id);

                btn.textContent = isFavorite(id) ? "⭐" : "☆";
            });
        });

        //paginado
        if (!showingFavorites) {
            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = list.length < pageSize;

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
        }

        // botón favoritos
        toggleFavBtn.onclick = () => {
            showingFavorites = !showingFavorites;

            toggleFavBtn.textContent = showingFavorites ? "Ver todos" : "⭐solo favoritos";

            loadList();
        };

    } catch (err) {
        container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
}