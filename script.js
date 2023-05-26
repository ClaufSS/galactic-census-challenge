
async function planetDetailsFromAPI(url) {
  const response = await fetch(url);
  const planet = await response.json();

  return planet;
}

async function personDetailsFromAPI(url) {
  const response = await fetch(url);
  const person = await response.json();

  return person;
}


function createPlanetElement(planet) {
  container = document.createElement('div');

  container.innerHTML = `<button>${planet.name}</button>`;

  return container;
}

function createPeopleDetailsTable(people) {
  const container = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  container.innerHTML = '<p>Habitantes mais famosos do planeta</p>';

  table.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Data de nascimento</th>
      </tr>
  `

  people.forEach(person => {
    const tableRow = document.createElement('tr');
    
    tableRow.innerHTML = `
      <td>${person.name}</td>
      <td>${person.birth_year}</td>
    `;

    tbody.appendChild(tableRow);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  return container;
}

async function createPlaneteDetailsElement(planet) {
  const container = document.createElement('div');
  const { name, climate, population, terrain, residents } = planet;

  const people = await Promise.all(residents.map(personDetailsFromAPI));
  const peopleDetailsTable = createPeopleDetailsTable(people);


  container.innerHTML = `
    <div>
      <div>
        <h2>Nome: ${name}</h2>
        <p>Clima: ${climate}</p>
        <p>População: ${population}</p>
        <p>Tipo de terreno: ${terrain}</p>
      <div>
    </div>`;

  container.appendChild(peopleDetailsTable);

  return container;
}

async function showPlanetDetails(event) {
  const url = event.target.parentElement.dataset.detailsUrl;
  const planet = await planetDetailsFromAPI(url);
  const planetElement = await createPlaneteDetailsElement(planet);

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
