export function Footer() {
    const year = new Date().getFullYear();

    return `
        <footer class="footer">
            <p>PokéSPA © ${year} — Proyecto Vite SPA</p>
        </footer>
    `;
}
