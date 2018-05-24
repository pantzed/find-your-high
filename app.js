(function() {
let strains = [];
let globalSearchString;

document.querySelector('#search-results-list').addEventListener("click", updateStrainInfo);

function updateStrainInfo(){
  let strainIndex = event.target.getAttribute('strain_index');
  document.getElementById('display-strain-name').textContent = strains[0][strainIndex].name;
  if (strains[0][strainIndex].desc === null){
    document.getElementById('strain-description').textContent = "No description Available!";
  }
  else {
    document.getElementById('strain-description').textContent = strains[0][strainIndex].desc;
  }
}

function displayAllReturnedStrains() {
  document.getElementById('search-results-list').innerHTML = "";
  strains[0].forEach(function(strain){
    let strainLink = document.createElement('a');
    strainLink.setAttribute('strain_index', strains[0].indexOf(strain));
    strainLink.setAttribute('href', "#");
    strainLink.innerHTML = strain.name;
    let strainName = document.createElement('li');
    strainName.appendChild(strainLink);
    document.getElementById('search-results-list').appendChild(strainName);
  });
}

function renderFirstStrainInfo() {
  displayAllReturnedStrains();
  let strainIndex = 0;
  strains[0].forEach(function(strain){
    if (strain.name.toLowerCase() === globalSearchString.toLowerCase()){
      strainIndex = strains[0].indexOf(strain);
    }
  });
  document.getElementById('display-strain-name').textContent = strains[0][strainIndex].name;
  if (strains[0][0].desc === null){
    document.getElementById('strain-description').textContent = "No description Available!";
  }
  else {
    document.getElementById('strain-description').textContent = strains[0][strainIndex].desc;
  }
}

document.getElementById('search-form').addEventListener('submit', processSubmit);

  function processSubmit() {
    strains = [];
    let searchString = validateSubmit();
    globalSearchString = searchString;
    globalSearchString = globalSearchString;
    if (searchString === false) {
      console.log("Invalid search, try again!");
    }
    else {
      requestInformation(searchString);
    }
  }

  function validateSubmit() {
    event.preventDefault();
    let searchString = document.getElementById('strain-name').value;
    searchString = searchString.trim();
    if (searchString.match(/^[\w]+([ ]?[\w]+)+$/gm)){
      clearSearch();
      return searchString;
    } else { return false; }
  }

  function clearSearch() {
    document.getElementById('strain-name').value = "";
  }

  function requestInformation(search) {
    fetch(`http://strainapi.evanbusse.com/eiZRheT/strains/search/name/${search}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        return;
      }
      strains.push(data);
      renderFirstStrainInfo();
    });
  }
})();