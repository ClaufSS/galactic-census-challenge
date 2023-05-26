
fetch('https://swapi.dev/api/planets')
  .then(res => res.json())
  .then(json => console.log(json.results))