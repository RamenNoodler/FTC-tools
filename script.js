// script.js

// DOMContentLoaded event ensures the script runs after the page has loaded
document.addEventListener('DOMContentLoaded', () => {
  // Handle button clicks to navigate to respective sections
  const buttons = document.querySelectorAll('.feature-card button');
  
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const featureId = event.target.closest('.feature-card').id;
      navigateToSection(featureId);
    });
  });

  // Function to simulate navigation (you can replace with actual routing later)
  function navigateToSection(sectionId) {
    // Here you can replace the alert with actual page navigation logic, like using:
    // window.location.href = `/${sectionId}` or updating the page content dynamically.
    
    // You could also use history.pushState() if working with single-page apps (SPA)
  }

  // Example: Set up dynamic content loading (e.g., fetch data for Match Scouting)
  fetchMatchData();
  
  // Example function for Match Scouting data
  function fetchMatchData() {
    // Placeholder for fetching external data (API call to ftcscout.org or similar)
    console.log("Fetching match data...");
    // You would replace this with actual API call and data processing
  }

  // Any other interactive functionality can be added here, such as chat system, form handling, etc.
});
