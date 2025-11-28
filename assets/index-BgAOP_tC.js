(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();function b(){return`
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
    `}function y(){return`
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
    `}function w(){return`
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
    `}const u="https://pokeapi.co/api/v2";async function x(e=200,t=0){try{const o=await fetch(`${u}/pokemon?limit=${e}&offset=${t}`);if(!o.ok)throw new Error("Error fetching list");return await o.json()}catch(o){throw o}}async function P(e){try{const t=await fetch(`${u}/pokemon/${e}`);if(!t.ok)throw new Error("Pokémon no encontrado");return await t.json()}catch(t){throw t}}const f="favoritos";function m(){const e=localStorage.getItem(f);return e?JSON.parse(e):[]}function k(e){localStorage.setItem(f,JSON.stringify(e))}function $(e){let t=m();t.includes(e)?t=t.filter(o=>o!==e):t.push(e),k(t)}function h(e){return m().includes(e)}let i=0;const p=9;let c=!1;function S(){return setTimeout(d,0),`
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
    `}function L(e){const t=e.url.split("/").filter(Boolean).pop(),o=h(t)?"⭐":"☆";return`
        <div class="col-md-4 col-sm-6">
            <div class="card text-center shadow-sm">

                <button class="fav-btn position-absolute top-0 end-0 m-2 btn btn-sm btn-warning" data-id="${t}"> ${o} </button>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${t}.png" class="card-img-top mx-auto d-block mt-3" style="width: 120px;"/>

                <div class="card-body">
                    <h5 class="card-title text-capitalize text-primary">${e.name}</h5>
                    <a href="#/detail/${t}" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        </div>
    `}async function d(){const e=document.getElementById("pokemon-list"),t=document.getElementById("prev-btn"),o=document.getElementById("next-btn"),r=document.getElementById("toggle-fav-btn");try{let n=[];if(c){const a=m();if(a.length===0){e.innerHTML=`
                    <p class="text-center text-warning fs-5">No tienes favoritos aún.</p>
                `;return}const s=a.map(l=>fetch(`https://pokeapi.co/api/v2/pokemon/${l}`).then(g=>g.json()));n=(await Promise.all(s)).map(l=>({name:l.name,url:`https://pokeapi.co/api/v2/pokemon/${l.id}/`}))}else{const a=i*p;n=(await x(p,a)).results}e.innerHTML=n.map(a=>L(a)).join(""),document.querySelectorAll(".fav-btn").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.id;$(s),a.textContent=h(s)?"⭐":"☆"})}),c||(t.disabled=i===0,o.disabled=n.length<p,t.onclick=()=>{i>0&&(i--,d())},o.onclick=()=>{i++,d()}),r.onclick=()=>{c=!c,r.textContent=c?"Ver todos":"⭐solo favoritos",d()}}catch(n){e.innerHTML=`<p class="error">Error: ${n.message}</p>`}}function E(e){return setTimeout(()=>A(e),0),`
        <section class="detail">
            <div id="detail-content">
                <p>Cargando Pokémon...</p>
            </div>
        </section>
    `}async function A(e){const t=document.getElementById("detail-content");try{const o=await P(e);t.innerHTML=`
            <article class="pokemon-detail-card">
                <h1>${o.name} <small>#${o.id}</small></h1>

                <img src="${o.sprites.front_default}" 
                     alt="${o.name}" 
                     width="150" 
                     height="150"/>

                <p><strong>Tipos:</strong> ${o.types.map(r=>r.type.name).join(", ")}</p>
                <p><strong>Altura:</strong> ${o.height}</p>
                <p><strong>Peso:</strong> ${o.weight}</p>

                <a class="btn btn-primary mt-3" href="#/list">Volver</a>
            </article>
        `}catch(o){t.innerHTML=`
            <p class="error">Error: ${o.message}</p>
            <a class="btn" href="#/list">Volver</a>
        `}}function v(){const e=document.getElementById("view"),t=location.hash.slice(1).toLowerCase()||"/",o={"/":b,"/about":y,"/list":S};if(t.startsWith("/detail/")){const n=t.split("/")[2];e.innerHTML=E(n);return}const r=o[t]||w;e.innerHTML=r()}function I(){return`
        <header class="header">
            <div class="header-content">
                <h1 class="logo"><a href="#/">PokéSPA</a></h1>

                <nav class="nav">
                    <a href="#/">Inicio</a>
                    <a href="#/list">Pokédex</a>
                    <a href="#/about">Sobre</a>
                </nav>
            </div>
        </header>
    `}function B(){return`
        <footer class="footer">
            <p>PokéSPA © ${new Date().getFullYear()} — Proyecto Vite SPA</p>
        </footer>
    `}const T=document.querySelector("#app");T.innerHTML=`
${I()}
  <main id="view"></main>
${B()}
  `;v();window.addEventListener("hashchange",v);
