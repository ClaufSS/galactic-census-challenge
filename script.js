
fetch('https://swapi.dev/api/planets')
  .then(res => res.json())
  .then(({results}) => {
    const planetsSection = document.getElementById('planets');

    Object.entries(results).forEach(([_, planet]) => {
      content = `
        <div>
          <button>${planet.name}</button>
        </div>
      `;

      planetsSection.innerHTML += content
    });
  })