export function NotFound() {
    return `
        <div class="container text-center mt-5">

            <div class="card shadow p-5 mx-auto" style="max-width: 600px; border-radius: 20px;">
                
                <h1 class="fw-bold text-danger mb-3">404</h1>
                
                <h4 class="mb-3">Página no encontrada</h4>

                <p class="mb-4">
                    La ruta que has intentado acceder no existe en esta PokéSPA.  
                    Puede que hayas escrito mal la dirección o que la página haya sido movida.
                </p>

                <a href="#/" class="btn btn-primary btn-lg">Volver al inicio</a>

            </div>

        </div>
    `;
}
