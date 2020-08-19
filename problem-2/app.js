let cafes, places;

document.addEventListener('DOMContentLoaded', async function () {
  // Get cafes
  let cafesResp = await getCafes();
  cafes = cafesResp.cafes;

  // Get places
  let placesResp = await getPlaces();
  places = placesResp.places;

  // List cafes
  listCafes('');
});

document.getElementById('search').addEventListener('keyup', searchCafes);

function searchCafes(e) {
  let input = e.target.value;
  listCafes(input);
  e.preventDefault();
}

async function listCafes(search) {
  let results = [];

  search = search.toLowerCase();
  // Find cafes
  cafes.forEach(function (cafe) {
    if (cafe.name.toLowerCase().includes(search)) {
      // Find places
      places.forEach(function (place) {
        if (place.id === cafe.location_id) {
          results.push({
            name: cafe.name,
            street_no: place.street_no,
            locality: place.locality,
            postal_code: place.postal_code,
            lat: place.lat,
            long: place.long
          });
        }
      });
    }
  });

  // Update UI
  updateUI(results);
}

function updateUI(cafes) {
  let html = '';
  cafes.forEach(function (cafe, index) {
    html += `
      <tr>
        <td class="column1">${++index}</td>
        <td class="column2">${cafe.name}</td>
        <td class="column3">${cafe.street_no}, ${cafe.locality}</td>
        <td class="column4">${cafe.postal_code}</td>
        <td class="column5">${cafe.lat}</td>
        <td class="column6">${cafe.long}</td>
      </tr>
    `;
  });

  document.querySelector('#cafes-list').innerHTML = html;
}

async function getCafes() {
  const response = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json'
  );
  const resData = await response.json();
  return resData;
}

async function getPlaces() {
  const response = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json'
  );
  const resData = await response.json();
  return resData;
}
