
async function planetDetailsFromAPI(url) {
  const response = await fetch(url);
  const planet = await response.json();

  return planet;
}


function createPlanetElement(planet) {
  container = document.createElement('div');

  container.innerHTML = `<button>${planet.name}</button>`;

  return container;
}

function createPlaneteDetailsElement(planet) {
  const container = document.createElement('div');
  const { name, climate, population, terrain } = planet;

  container.innerHTML = `
    <div>
      <h2>Nome: ${name}</h2>
      <p>Clima: ${climate}</p>
      <p>População: ${population}</p>
      <p>Tipo de terreno: ${terrain}</p>
    </div>`;

  return container;
}

async function showPlanetDetails(event) {
  const url = event.target.parentElement.dataset.detailsUrl;
  const planet = await planetDetailsFromAPI(url);
  const planetElement = createPlaneteDetailsElement(planet);

  event.target.replaceWith(planetElement);
}



window.addEventListener('load', () => {
  const planetSearch = document.getElementById('planet-search');

  planetSearch.addEventListener('click', () => {
    const planetField = document.getElementById('planet-field');
    const searchResult = document.getElementById('search-results');
    const querySearch = planetField.value;
    const url = new URL('/api/planets', 'https://swapi.dev');

    url.searchParams.append('search', querySearch);
    searchResult.innerHTML = '';

    fetch(url)
      .then(response => response.json())
      .then(({results}) => {
        results.forEach(planet => {
          planetElement = createPlaneteDetailsElement(planet);

          searchResult.appendChild(planetElement);
        });

        if (results.length === 0) {
          const notFoundElementPresentation = document.createElement('p');

          notFoundElementPresentation.textContent = 'Não há correspondência para #' + querySearch;

          searchResult.appendChild(notFoundElementPresentation);
        }
      });
  });
})


fetch('https://swapi.dev/api/planets')
  .then(res => res.json())
  .then(({results}) => {
    const planetsSection = document.getElementById('planets');

    Object.entries(results).forEach(([id, planet]) => {
      const planetElement = createPlanetElement(planet);

      planetElement.dataset.detailsUrl = planet.url;

      planetsSection.appendChild(planetElement);
      planetElement
        .querySelector('button')
        .addEventListener('click', showPlanetDetails);
    });
  });
