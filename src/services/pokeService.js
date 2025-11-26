const BASE = 'https://pokeapi.co/api/v2';


export async function fetchPokemons(limit = 200, offset = 0) {
    try {
        const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error('Error fetching list');
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
}


export async function fetchPokemonByNameOrId(idOrName) {
    try {
        const res = await fetch(`${BASE}/pokemon/${idOrName}`);
        if (!res.ok) throw new Error('Pokémon no encontrado');
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
}