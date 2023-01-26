function fetchJobsFromServer() {
fetch('job-listings.json')
  .then(response => response.json())
  .then(data => {  
    jobListings = data;
    displayJobListings();   
  });
}

fetchJobsFromServer();

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

let form = document.getElementById("search-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  let keyword = document.getElementById("keyword").value;
  let location = document.getElementById("location").value;
  console.log(keyword);
  console.log(location);
  searchJobs(keyword, location);
});

function searchJobs(keyword, location) {
  fetch('job-listings.json')
  .then(response => response.json())
  .then(data => {  
    jobs = data;     

  let filteredJobs = jobs.filter(job => {
    if (job.title.toLowerCase().includes(keyword.toLowerCase()) && job.location.toLowerCase().includes(location.toLowerCase())) {
      return true;
    }
    return false;
  });

  let jobListings = document.getElementById("job-listings");
  let jobListingsHTML = "<h2>Recent Job Listings</h2>";

  jobListingsHTML += `<ul>`;

  for (let i = 0; i < filteredJobs.length; i++) {
    let jobListing = filteredJobs[i];
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

  jobListings.innerHTML = jobListingsHTML;
   });
}
