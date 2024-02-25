// Fetch data from the JSON file
fetch("/Json/songs.json")
  .then((response) => response.json())
  .then((data) => {
    // Now 'data' contains the parsed JSON content
    console.log(data);

    // The rest of your script for creating cards dynamically can go here
    const cardContainer = document.getElementById("section2-cardContainer");

    // Loop through the JSON data and create cards dynamically
    data.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("song-main-card");

      card.innerHTML = `
        <div class="img-div">
          <img class="song-image" src="${data.image}" alt="" />
        </div>
        <h3 class="song-name">${data.name}</h3>
        <p class="song-description">${data.description}</p>

      `;

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// FETCH ALL SONGS
fetch("/Json/songs_details.json")
  .then((response) => response.json())
  .then((data) => {
    // Now 'data' contains the parsed JSON content
    console.log(data);

    // The rest of your script for creating cards dynamically can go here
    const cardContainer = document.getElementById("songs-cardContainer");

    // Loop through the JSON data and create cards dynamically
    data.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("song-main-card");

      card.innerHTML = `
      <a class="card-anchor" href="songs_new.html">
          <div class="img-div">
            <img class="song-image" src="${data.image}" alt="" />
          </div>
          <h3 class="song-name">${data.song_name}</h3>
          <p class="song-description">${data.song_artist}</p>
          <img class="play" src='/images/play-button-svgrepo-com.svg' alt="" />
          </a>
      `;

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// CARD CONTAINER 2
fetch("/Json/songs_details.json")
  .then((response) => response.json())
  .then((data) => {
    // Now 'data' contains the parsed JSON content
    console.log(data);

    // The rest of your script for creating cards dynamically can go here
    const cardContainer = document.getElementById("songs-cardContainer2");

    // Loop through the JSON data and create cards dynamically
    data.forEach((data) => {
      const card = document.createElement("div");
      card.classList.add("song-main-card");

      card.innerHTML = `
      <a class="card-anchor" href="">
          <div class="img-div">
            <img class="song-image" src="${data.image}" alt="" />
          </div>
          <h3 class="song-name">${data.song_name}</h3>
          <p class="song-description">${data.song_artist}</p>
          <img class="play" src='/images/play-button-svgrepo-com.svg' alt="" />
          </a>
      `;

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// footer dropdown function-------------------------====
function displayDropDown(className) {
  const element = document.querySelector("." + className);
  if (element.style.display === "none" || !element.style.display) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

//   filtered items------------------------------
fetch("/Json/songs_details.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.getElementById("section2-searchContainer");

    // Function to filter songs based on search input
    window.filterSongs = function () {
      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();

      cardContainer.innerHTML = "";

      if (searchInput != "") {
        document.getElementById("section2-searchContainer").style.display =
          "block";
        document.getElementById("section2-searchContainer").style.display =
          "flex";
        document.getElementsByClassName("cancel-search")[0].style.display =
          "block";

        // Filter songs based on search input
        const filteredSongs = data.filter(
          (song) =>
            song.song_artist.toLowerCase().startsWith(searchInput) ||
            song.song_name.toLowerCase().startsWith(searchInput)
        );

        // Loop through the filtered songs and create cards dynamically
        filteredSongs.forEach((song) => {
          const card = document.createElement("div");
          card.classList.add("song-main-card");

          card.innerHTML = `
              <div class="img-div">
                <img class="song-image" src="${song.image}" alt="" />
              </div>
              <h3 class="song-name">${song.song_name}</h3>
              <p class="song-description">${song.song_artist}</p>
              <img class="play" src='/images/main_logo.svg' alt=" />"
            `;

          cardContainer.appendChild(card);
        });
      } else {
        document.getElementsByClassName("cancel-search")[0].style.display =
          "none";
        document.getElementById("section2-searchContainer").style.display =
          "none";
      }
    };
  })
  .catch((error) => console.error("Error fetching data:", error));

function removeSearchDiv() {
  document.getElementById("searchInput").value = "";
  filterSongs();
}

document.getElementById("logout").addEventListener("click", function () {
  window.location.href = "index.html";
});

function changeButton() {
  var button = document.getElementById("myButton");
  var section2Containers = document.getElementsByClassName(
    "section2-bottom-box"
  );
  var topBox = document.getElementsByClassName("top-box");
  if (button.innerText === "Dark Mode") {
    button.innerText = "Light Mode";
    for (var i = 0; i < section2Containers.length; i++) {
      section2Containers[i].style.backgroundColor = "white"; // Change background color of section2 containers to white
    }
    topBox[0].style.backgroundColor = "white";
    document.getElementsByClassName("main-heading")[0].style.color = "black";
    document.getElementsByClassName("home-anchor")[0].style.color = "black";
    document.getElementById("section2-cardContainer").style.backgroundColor =
      "white";
    document.getElementById("songs-cardContainer").style.backgroundColor =
      "white";
    document.getElementById("songs-cardContainer2").style.backgroundColor =
      "white";
    document.getElementsByClassName("bottom-box")[0].style.backgroundColor =
      "white";
    document.getElementsByClassName(
      "section2-top-box"
    )[0].style.backgroundColor = "white";
    document.getElementsByClassName("main-row")[0].style.backgroundColor =
      "white";
  } else {
    button.innerText = "Dark Mode";
    for (var i = 0; i < section2Containers.length; i++) {
      section2Containers[i].style.backgroundColor = "black"; // Change background color of section2 containers to black
    }
    topBox[0].style.backgroundColor = "black";
    document.getElementById("section2-cardContainer").style.backgroundColor =
      "black";
    document.getElementById("songs-cardContainer").style.backgroundColor =
      "black";
    document.getElementById("songs-cardContainer2").style.backgroundColor =
      "blaxk";
    document.getElementsByClassName("bottom-box")[0].style.backgroundColor =
      "black";
  }
}
