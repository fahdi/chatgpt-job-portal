function fetchJobsFromServer() {
  fetch("job-listings.json")
    .then((response) => response.json())
    .then((data) => {
      jobListings = data;
      displayJobListings();
      populateLocationDropdown(data);
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

function populateLocationDropdown(data) {
  const locations = Array.from(new Set(data.map((job) => job.location)));
  const locationSelect = document.getElementById("location-select");
  for (let i = 0; i < locations.length; i++) {
    let option = document.createElement("option");
    option.value = locations[i];
    option.text = locations[i];
    locationSelect.appendChild(option);
  }
}

let form = document.getElementById("search-form");
if (form) {
  console.log("Form exists!");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let keyword = document.getElementById("keyword").value;
    const location = document.getElementById("location-select").value;
    // console.log(keyword);
    // console.log(location);
    searchJobs(keyword, location);
  });
}

function searchJobs(keyword, location) {
  fetch("job-listings.json")
    .then((response) => response.json())
    .then((data) => {
      jobs = data;

      let filteredJobs = jobs.filter((job) => {
        if (
          job.title.toLowerCase().includes(keyword.toLowerCase()) &&
          job.location.toLowerCase().includes(location.toLowerCase())
        ) {
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

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData);
    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    fetch("http://localhost:3000/submit-form", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log(text);
        alert("Form submitted successfully!");
      })
      .catch(function (error) {
        console.error(error);
        alert("Error: Form could not be submitted");
      });
  });
