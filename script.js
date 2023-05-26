
function createPlanetElement(planet) {
  container = document.createElement('div');

  container.innerHTML = `
    <button>${planet.name}</button>
  `;

  return container;
}

async function showDetails(e) {
  const url = e.target.parentElement.dataset.detailsUrl;
  const container = document.createElement('div');

  const response = await fetch(url);
  const { name, climate, population, terrain } = await response.json()


  container.innerHTML = `
    <div>
      <h2>Nome: ${name}</h2>
      <p>Clima: ${climate}</p>
      <p>População: ${population}</p>
      <p>Tipo de terreno: ${terrain}</p>
    </div>
  `;

  e.target.replaceWith(container);
}


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
        .addEventListener('click', showDetails);
    });
  });
