const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {

    const fs = require('fs')

    const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1)
    let fileContent = pokemonsIds.map(id => `/pokemons/${id}`).join('\n')

    for (let i = 0; i < TOTAL_PAGES; i++) {
        fileContent += `\n/pokemons/page/${i + 1}`
    }
    
    const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

    fileContent += '\n'
    fileContent += pokemonNameList.results.map(pokemon => `/pokemons/${pokemon.name}`).join('\n')



    fs.writeFileSync('routes.txt', fileContent)
})();
