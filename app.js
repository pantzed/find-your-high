(function() {
  let strains = [];
  let globalSearchString;

  document.getElementById('search-form').addEventListener('submit', processSubmit);
  document.getElementById('search-results-list').addEventListener("click", updateStrainInfo);

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
      strainLink.setAttribute('href', "#info-row");
      strainLink.innerHTML = strain.name;
      let strainName = document.createElement('li');
      strainName.appendChild(strainLink);
      document.getElementById('search-results-list').appendChild(strainName);
    });
  }

  function noExactMatchAlert() {
    document.querySelector('#alert > p').innerHTML = (`* No exact result for "${globalSearchString}"`).toUpperCase();
  }

  function renderFirstStrainInfo() {
    console.log(strains);
    displayAllReturnedStrains();
    let strainIndex = 0;
    let exact = false;
    strains[0].forEach(function(strain){
      if (strain.name.toLowerCase() === globalSearchString.toLowerCase()){
        strainIndex = strains[0].indexOf(strain);
        exact = true;
      }
    });
    if (exact === false){
      noExactMatchAlert();
    }
    else {
      document.querySelector('#alert > p').innerHTML = "";
    }
    document.getElementById('display-strain-name').textContent = strains[0][strainIndex].name;
    if (strains[0][0].desc === null){
      document.getElementById('strain-description').textContent = "No description Available!";
    }
    else {
      document.getElementById('strain-description').textContent = strains[0][strainIndex].desc;
    }
    document.getElementById('strain-race').textContent = `Type: ${strains[0][strainIndex].race}`;
  }

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