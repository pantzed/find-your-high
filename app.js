(function() {
let strains = [];

function renderStrainInfo() {
  strains.forEach(function(strain){
    document.getElementById('display-strain-name').textContent = strain.name;
    document.getElementById('strain-description-header').textContent = "Description";
    document.getElementById('strain-description').textContent = strain.desc;
  });
}

document.getElementById('search-form').addEventListener('submit', processSubmit);

  function processSubmit() {
    let searchString = validateSubmit();
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
      strains.push(data[0]);
      renderStrainInfo();
    });
  }
})();