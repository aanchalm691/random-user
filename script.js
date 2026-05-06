const API_URL = "https://api.freeapi.app/api/v1/public/randomusers";

const usersContainer = document.getElementById("usersContainer");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");

let usersData = [];

// Fetch Users
async function fetchUsers() {
  loader.style.display = "block";

  try {
    const res = await fetch(API_URL);
    const result = await res.json();

    usersData = result.data.data;

    displayUsers(usersData);
  } catch (err) {
    usersContainer.innerHTML = "<p>Error loading users</p>";
  }

  loader.style.display = "none";
}

// Display Users
function displayUsers(users) {
  usersContainer.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="profile">
        <img src="${user.picture.medium}" alt="user"/>
        <div>
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>${user.gender}</p>
        </div>
      </div>

      <div class="info">
        <p>📧 ${user.email}</p>
        <p>📍 ${user.location.city}, ${user.location.country}</p>
        <p>📞 ${user.phone}</p>
      </div>

      <div class="tags">
        <span class="tag">Age: ${user.dob.age}</span>
        <span class="tag">${user.nat}</span>
      </div>
    `;

    usersContainer.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = usersData.filter(user =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(value)
  );

  displayUsers(filtered);
});

// Init
fetchUsers();