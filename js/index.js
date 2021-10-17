const pokeCard = document.getElementById("data-poke-card")
const pokeName = document.getElementById("data-poke-name")
const pokeImg = document.getElementById("data-poke-img")
const pokeImgContainer = document.getElementById("data-poke-img-container")
const pokeId = document.getElementById("data-poke-id")
const pokeTypes = document.getElementById("data-poke-types")
const pokeStats = document.getElementById("data-poke-stats")

const typesColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F'
}

const searchPokemon = event => {
  event.preventDefault()
  const {value} = event.target.pokemon
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
  .then(data => data.json())
  .then(res => renderPokemonData(res))
}

const renderPokemonData = data => {
  const sprite = data.sprites.front_default
  const {stats, types} = data

  pokeName.textContent = data.name
  pokeImg.setAttribute('src', sprite)
  pokeId.textContent = `No. ${data.id}`
  setCardColor(types)
  setPokemonTypes(types)
  setPokemonStats(stats)
}

const setCardColor = types => {
  const colorOne = typesColors[types[0].type.name]
  const colorTwo = types[1] ? typesColors[types[1].type.name] : typesColors.default

  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`
  pokeImg.style.backgroundSize = ' 5px 5px'
}

const setPokemonTypes = types => {
  pokeTypes.innerHTML = ''
  types.forEach(type => {
    const typeTextElement = document.createElement('div')
    typeTextElement.style.color = typesColors[type.type.name]
    typeTextElement.textContent = type.type.name
    pokeTypes.appendChild(typeTextElement)
  })
}

const setPokemonStats = stats => {
  pokeStats.innerHTML = ''
  stats.forEach(stat => {
    const statElement = document.createElement('div')
    const statElementName = document.createElement('div')
    const statElementAmount = document.createElement('div')

    statElementName.textContent = stat.stat.name
    statElementAmount.textContent = stat.base_stat
    statElement.appendChild(statElementName)
    statElement.appendChild(statElementAmount)
    pokeStats.appendChild(statElement)
  })
}