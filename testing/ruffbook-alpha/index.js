// Function to dynamically generate options
function generateOptions(options) {
    var select = document.getElementById("sourceSelector");
    var categoryElements = {}; // Object to store each category's optgroup element
    options.forEach(function(option) {
      if (!categoryElements[option.type]) {
        categoryElements[option.type] = document.createElement("optgroup");
        categoryElements[option.type].label = option.type;
        select.appendChild(categoryElements[option.type]);
      }
      var optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      categoryElements[option.type].appendChild(optionElement);
    });
  }
  
  // Fetch data and generate options
  fetch('/data.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
      // Sort options alphabetically by name
      data.sort((a, b) => a.name.localeCompare(b.name));
      generateOptions(data); // Call function to generate options
    })
    .catch(error => console.error('Error fetching data:', error));
  
  // Function to change source
  document.getElementById("sourceSelector").addEventListener("change", function() {
    var select = document.getElementById("sourceSelector");
    var selectedSrc = select.options[select.selectedIndex].value;
    document.getElementById("myEmbed").src = selectedSrc;
  });
  
  
  // Event listener for when the connection is lost
  window.addEventListener('offline', showConnectionLostMessage);
  
  // Event listener for when the connection is restored
  window.addEventListener('online', hideConnectionLostMessage);
  
  // Function to show the message when connection is lost
  function showConnectionLostMessage() {
      document.getElementById('lostConnect').style.display = 'flex';
  }
  
  // Function to hide the message when connection is restored
  function hideConnectionLostMessage() {
      document.getElementById('lostConnect').style.display = 'none';
  }