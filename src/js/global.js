
//Master Javascript Document - Copyright Paddy Griffin 2018

// Add noConflict rule
$.noConflict();

jQuery( document ).ready(function( $ ) {

  // Menu Close button
  jQuery('#jsCloseButton').click(function () {
    jQuery('#st-container').removeClass('st-menu-open');
  });


  // Check the page location
  if ( window.location.pathname == '/' ){
      // Homepage

  } else {
      // Subpages
      jQuery('header').addClass('c-site-head--alternative');
  }




});
// end document ready




// Projects Data - import data via a JSON file

// Create a new variable for the HTML ID so the code checks if the ID.
var projectsElement = document.getElementById("jsProjectsTemplate");

// Check if the ID referenced in the variable above is present
if(projectsElement != null) {

  var getProjects = new XMLHttpRequest();

  // Open a new 'GET' request to the file
  getProjects.open('GET', '/data/projects.json');

  // Load the function
  getProjects.onload = function () {

    // Error Checking the JSON File
    if(getProjects.status >= 200 && getProjects.status < 400) {
      var data = JSON.parse(getProjects.responseText);
        renderProjects(data);
      } else {
        // output to console if server returns an error
        console.log("We connected to the server, but it returned an error");
      }

  };

  // Error Checking
  getProjects.onerror = function() {
    console.log("Connection error");
  };

  // Send HTTP request to the server
  getProjects.send();


  // Function to render the html
  function renderProjects(projectsData) {
    var projectsrawTemplate = document.getElementById("jsProjectsTemplate").innerHTML;
    var projectsCompliedTemplate = Handlebars.compile(projectsrawTemplate);
    var projectsGeneratedHTML = projectsCompliedTemplate(projectsData);
    var projectsContainer = document.getElementById("jsProjectsGrid");
    projectsContainer.innerHTML = projectsGeneratedHTML;
  };

} // end if
