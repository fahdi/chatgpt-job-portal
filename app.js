let jobListings;
fetch('job-listings.json')
  .then(response => response.json())
  .then(data => {
    jobListings = data;
    displayJobListings();
  });

function displayJobListings() {
  let jobListingsContainer = document.getElementById("job-listings");
  let jobListingsHTML = "<h2>Recent Job Listings</h2>";
  jobListingsHTML += `<ul>`;
  for (let i = 0; i < jobListings.length; i++) {
    let jobListing = jobListings[i];
    jobListingsHTML += `
      <li>
        <h3><i class="fas fa-briefcase"></i> ${jobListing.title}</h3>
        <p><i class="fas fa-building"></i> ${jobListing.company}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${jobListing.location}</p>
        <p><i class="fas fa-calendar-week"></i> ${jobListing.type}</p>
        <a href="#">View Job</a>
      </li>
    `;
  }
  jobListingsHTML += `</ul>`;
  jobListingsContainer.innerHTML = jobListingsHTML;
}
