const cardContainer = document.getElementById("songs-cardContainer2");
const searchContainer = document.getElementById("section2-searchContainer");
const filterContainer = document.getElementById("section2-FilterContainer");
const popularityContainer = document.getElementById("songs-PopularContainer2");

fetch("/Json/songs_details.json")
  .then((response) => response.json())
  .then((data) => {
    const popularCheck = document.getElementById("formCheckChecked");

    // Function to render cards based on checkbox value
    function renderCards() {
      cardContainer.innerHTML = ""; // Clear previous content

      if (popularCheck.checked) {
        const sortedData = [...data]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6); // Create a copy of the data array before sorting
        sortedData.forEach((song) => {
          const card = createSongCard(song);
          cardContainer.appendChild(card);
        });
      } else {
        data.forEach((song) => {
          const card = createSongCard(song);
          cardContainer.appendChild(card);
        });
      }
    }

    // Initial rendering based on checkbox state
    renderCards();

    // Event listener for checkbox change
    popularCheck.addEventListener("change", renderCards);

    // Function to filter songs based on search input
    window.filterSongs = function () {
      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
      searchContainer.innerHTML = "";

      if (searchInput !== "") {
        document.getElementById("section2-searchContainer").style.display =
          "block";
        document.getElementById("section2-searchContainer").style.display =
          "flex";
        document.getElementsByClassName("cancel-search")[0].style.display =
          "block";

        // Filter songs based on search input
        const filteredSongs = data.filter((song) =>
          song.song_artist.toLowerCase().startsWith(searchInput)
        );

        // Loop through the filtered songs and create cards dynamically
        filteredSongs.forEach((song) => {
          const card = createSongCard(song);
          searchContainer.appendChild(card);
        });
      } else {
        document.getElementsByClassName("cancel-search")[0].style.display =
          "none";
        document.getElementById("section2-searchContainer").style.display =
          "none";
      }
    };

    // Event listener for form-select
    const formSelect = document.getElementById("formSelect");
    formSelect.addEventListener("change", function () {
      const selectedValue = formSelect.value.toLowerCase();
      if (selectedValue != "all songs") {
        document.getElementById("searchInput").disabled = true;
      } else {
        document.getElementById("searchInput").disabled = false;
      }

      // Filter data based on the selected value
      const filteredData = data.filter(
        (song) => song.song_artist.toLowerCase() === selectedValue
      );

      // Clear previous content
      filterContainer.innerHTML = "";

      // Loop through the filtered data and create cards dynamically
      filteredData.forEach((song) => {
        const card = createSongCard(song);
        filterContainer.appendChild(card);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

function createSongCard(song) {
  const card = document.createElement("div");
  card.classList.add("song-main-card");

  card.innerHTML = `
    <div class="img-div">
      <img class="song-image" src="${song.image}" alt="" />
    </div>
    <h3 class="song-name">${song.song_name}</h3>
    <p class="song-description">${song.song_artist}</p>
    <span class="song-likes"> <img class="likes" src='/images/heart-svgrepo-com.svg' alt="" />${song.popularity}</span>
    <img class="play" src='/images/play-button-svgrepo-com.svg' alt="" />
  `;

  return card;
}

function removeSearchDiv() {
  document.getElementById("searchInput").value = "";
  filterSongs();
}
