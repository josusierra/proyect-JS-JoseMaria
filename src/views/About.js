export function About() {
    return `
        <div class="container mt-5">

            <div class="card shadow p-4 mx-auto" style="max-width: 700px; border-radius: 18px;">

                <h1 class="text-primary fw-bold text-center mb-3">Sobre PokéSPA</h1>

                <p class="lead text-center mb-4">
                    Este proyecto es una aplicacion desarrollada con <strong>JavaScript</strong> y <strong>Vite</strong>, 
                    usando la <strong>PokéAPI</strong> para obtener información en tiempo real sobre los Pokémon.
                </p>

                <p>
                    La aplicación demuestra conceptos básicos y avanzados del desarrollo web moderno
                </p>

                <p>
                    El objetivo de PokéSPA es mostrar cómo construir una aplicación interactiva y limpia 
                    sin frameworks grandes como React o Vue, usando únicamente las bases del JavaScript moderno.
                </p>

                <div class="text-center mt-4">
                    <a href="#/" class="btn btn-primary">Volver al inicio</a>
                </div>

            </div>

        </div>
    `;
}
