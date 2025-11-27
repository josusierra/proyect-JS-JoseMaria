export function Home() {
    return `
        <div class="container text-center mt-5">

            <div class="card shadow-lg p-5 mx-auto" style="max-width: 650px; border-radius: 20px;">

                <h1 class="fw-bold text-danger mb-3">Bienvenido a la PokéSPA</h1>

                <p class="lead mb-4">
                    Explora todos los Pokémon, revisa sus detalles y disfruta de una Pokédex moderna hecha con Vite.
                </p>

                <img 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" class="mx-auto d-block mb-4" width="120"
                />

                <a href="#/list" class="btn btn-primary btn-lg px-4">
                    Ir a la Pokédex
                </a>

            </div>

        </div>
    `;
}
