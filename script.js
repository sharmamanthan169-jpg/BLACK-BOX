// ==========================================
// API CONFIG
// ==========================================

const OMDB_API_KEY = "e22b3b4d";
const OMDB_URL = "https://www.omdbapi.com/";

const YOUTUBE_API_KEY = "AIzaSyAvYiL30mOs0qBvSHieKg-vxL2DXdtfw-M";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

// ==========================================
// MOVIE DATA
// ==========================================

const movies = [

    {
        title: "Stranger Things",
        year: "2016",
        video: "b9EkMc79ZSU",
        background: "https://i0.wp.com/thefutureoftheforce.com/wp-content/uploads/2025/10/Stranger-Things-5-Official-Poster-Header-FUTURE-OF-THE-FORCE.jpg?fit=1024%2C576&ssl=1"
    },

    {
        title: "Wednesday",
        year: "2022",
        video: "Di310WS8zLk",
        background: "https://eastside-online.org/wp-content/uploads/2022/12/wednesday-900x506.jpeg"
    },

    {
        title: "Money Heist",
        year: "2017",
        video: "_InqQJRqGW4",
        background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4QYYfZObc8eqSbRxNivp53gn9HFPg6XkC-7utXKBag&s=10"
    },

    {
        title: "Squid Game",
        year: "2021",
        video: "oqxAJKy0ii4",
        background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGOxgpryfv1ANIZz6M64HcqH3zHu3GUTNRKAuLwIaBA&s=10"
    },

    {
        title: "The Witcher",
        year: "2019",
        video: "ndl1W4ltcmg",
        background: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2021/07/the-witcher-season-2-release-date-social-featured.jpg"
    },

    {
        title: "Dark",
        year: "2017",
        video: "rrwycJ08PSA",
        background: "https://foreigncrimedrama.com/wp-content/uploads/2019/05/dark-netflix-s.jpg"
    }

];

// ==========================================
// HERO ELEMENTS
// ==========================================

const hero = document.querySelector(".hero");

const heroTitle = document.getElementById("heroTitle");
const heroYear = document.getElementById("heroYear");
const heroRating = document.getElementById("heroRating");
const heroGenre = document.getElementById("heroGenre");
const heroDescription =
    document.getElementById("heroDescription");

const heroWatchBtn =
    document.getElementById("heroWatchBtn");

const heroInfoBtn =
    document.getElementById("heroInfoBtn");

const heroDots =
    document.querySelectorAll(".hero-dot");

let currentMovie = 0;


// ==========================================
// GET MOVIE FROM OMDb
// ==========================================

async function getMovieFromOMDb(movieName) {

    try {

        const response = await fetch(
            `${OMDB_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movieName)}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "False") {

            console.log(
                "Movie not found:",
                movieName
            );

            return null;
        }

        return data;

    } catch (error) {

        console.error(
            "OMDb API Error:",
            error
        );

        return null;
    }
}


// ==========================================
// LOAD ALL OMDb DATA
// ==========================================

async function loadMovieData() {

    for (const movie of movies) {

        const data =
            await getMovieFromOMDb(movie.title);

        if (data) {

            movie.omdb = data;

            console.log(
                movie.title,
                "loaded successfully"
            );
        }
    }

    updateHero(0);
}


// ==========================================
// UPDATE HERO
// ==========================================

function updateHero(index) {

    const movie = movies[index];

    currentMovie = index;

    const data = movie.omdb;


    // --------------------------------------
    // Background
    // --------------------------------------

    // Use your wide hero background image
if (movie.background) {

    hero.style.backgroundImage =
        `url("${movie.background}")`;
}


    // --------------------------------------
    // Title
    // --------------------------------------

    heroTitle.textContent =
        data?.Title || movie.title;


    // --------------------------------------
    // Year
    // --------------------------------------

    heroYear.textContent =
        data?.Year || movie.year;


    // --------------------------------------
    // Rating
    // --------------------------------------

    heroRating.textContent =
        data?.imdbRating && data.imdbRating !== "N/A"
            ? `⭐ ${data.imdbRating}`
            : "⭐ N/A";


    // --------------------------------------
    // Genre
    // --------------------------------------

    heroGenre.textContent =
        data?.Genre || "Movie";


    // --------------------------------------
    // Description
    // --------------------------------------

    heroDescription.textContent =
        data?.Plot && data.Plot !== "N/A"
            ? data.Plot
            : "Movie information is not available.";


    // --------------------------------------
    // Active Dot
    // --------------------------------------

    heroDots.forEach(dot => {

        dot.classList.remove("active");

    });


    if (heroDots[index]) {

        heroDots[index]
            .classList.add("active");
    }


    // --------------------------------------
    // Animation
    // --------------------------------------

    const content =
        document.querySelector(".hero-content");

    if (content) {

        content.style.animation = "none";

        void content.offsetWidth;

        content.style.animation =
            "heroFade 0.8s ease";
    }
}


// ==========================================
// START
// ==========================================

loadMovieData();


// ==========================================
// HERO DOTS
// ==========================================

heroDots.forEach(dot => {

    dot.addEventListener(
        "click",
        () => {

            const index =
                Number(dot.dataset.index);

            updateHero(index);

        }
    );

});


// ==========================================
// AUTO SLIDER - 6 SECONDS
// ==========================================

setInterval(() => {

    currentMovie++;

    if (currentMovie >= movies.length) {

        currentMovie = 0;
    }

    updateHero(currentMovie);

}, 6000);


// ==========================================
// TRAILER MODAL
// ==========================================

const trailerModal =
    document.getElementById("trailerModal");

const trailerFrame =
    document.getElementById("trailerFrame");

const closeModal =
    document.getElementById("closeModal");


// ==========================================
// OPEN TRAILER
// ==========================================

function openTrailer(videoId) {

    if (!videoId) {

        alert("Trailer is not available.");

        return;
    }

    trailerFrame.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    trailerModal.classList.add("active");

    document.body.style.overflow = "hidden";
}


// ==========================================
// CLOSE TRAILER
// ==========================================

function closeTrailer() {

    trailerModal.classList.remove("active");

    trailerFrame.src = "";

    document.body.style.overflow = "";
}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeTrailer
    );
}


if (trailerModal) {

    trailerModal.addEventListener(
        "click",
        event => {

            if (event.target === trailerModal) {

                closeTrailer();
            }
        }
    );
}


// ==========================================
// WATCH BUTTONS
// ==========================================

const watchButtons =
    document.querySelectorAll(".watch-btn");


watchButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const videoId =
                button.dataset.videoId;

            openTrailer(videoId);
        }
    );

});


// ==========================================
// HERO WATCH
// ==========================================

if (heroWatchBtn) {

    heroWatchBtn.addEventListener(
        "click",
        () => {

            const movie =
                movies[currentMovie];

            openTrailer(movie.video);

        }
    );
}


// ==========================================
// INFO MODAL
// ==========================================

const infoModal =
    document.getElementById("infoModal");

const infoTitle =
    document.getElementById("infoTitle");

const infoText =
    document.getElementById("infoText");

const closeInfo =
    document.getElementById("closeInfo");


if (heroInfoBtn) {

    heroInfoBtn.addEventListener(
        "click",
        () => {

            const movie =
                movies[currentMovie];

            const data =
                movie.omdb;


            infoTitle.textContent =
                data?.Title || movie.title;


            infoText.textContent =
                `${data?.Title || movie.title} • ` +
                `${data?.Year || movie.year} • ` +
                `${data?.Genre || "Movie"} • ` +
                `⭐ ${data?.imdbRating || "N/A"}. ` +
                `${data?.Plot || "No description available."}`;


            infoModal.classList.add("active");

        }
    );
}


if (closeInfo) {

    closeInfo.addEventListener(
        "click",
        () => {

            infoModal.classList.remove("active");

        }
    );
}


if (infoModal) {

    infoModal.addEventListener(
        "click",
        event => {

            if (event.target === infoModal) {

                infoModal.classList.remove("active");
            }

        }
    );
}


// ==========================================
// OMDb SEARCH
// ==========================================

const searchIcon = document.getElementById("searchIcon");
const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("searchInput");


// Open search box
if (searchIcon && searchBox) {

    searchIcon.addEventListener("click", () => {

        searchBox.classList.toggle("active");

        if (searchBox.classList.contains("active")) {
            searchInput.focus();
        }

    });

}


// Search
if (searchInput) {

    searchInput.addEventListener("input", async () => {

        const searchText =
            searchInput.value.trim();

        if (searchText.length === 0) {

            location.reload();

            return;
        }

        if (searchText.length < 2) {
            return;
        }

        await searchMovies(searchText);

    });

}


// ==========================================
// SEARCH MOVIES FROM OMDb
// ==========================================

async function searchMovies(movieName) {

    try {

        const url =
            `${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(movieName)}`;

        console.log("Searching:", url);

        const response =
            await fetch(url);

        const data =
            await response.json();

        console.log("OMDb Response:", data);


        if (data.Response === "False") {

            showSearchMessage(
                data.Error || "Movie not found."
            );

            return;
        }


        if (data.Search) {

            displaySearchResults(data.Search);

        }


    } catch (error) {

        console.error(
            "OMDb ERROR:",
            error
        );

        showSearchMessage(
            "Search error. Check your internet connection."
        );

    }

}


// ==========================================
// DISPLAY RESULTS
// ==========================================

function displaySearchResults(results) {

    const movieRow =
        document.getElementById("movieRow");

    if (!movieRow) return;

    movieRow.innerHTML = "";


    results.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";


        const poster =
            movie.Poster &&
            movie.Poster !== "N/A"
                ? movie.Poster
                : "";


        card.innerHTML = `

            <div
                class="poster"
                style="background-image: url('${poster}')">
            </div>

            <div class="movie-overlay">

                <h3>${movie.Title}</h3>

                <p>${movie.Year}</p>

                <button
                    class="watch-btn"
                    data-imdb="${movie.imdbID}">

                    <i class="fa-solid fa-play"></i>
                    Watch Trailer

                </button>

            </div>

        `;


        movieRow.appendChild(card);


        const watchButton =
            card.querySelector(".watch-btn");


        watchButton.addEventListener(
            "click",
            async (event) => {

                event.stopPropagation();

                watchButton.innerHTML =
                    `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;

                watchButton.disabled = true;


                const trailer =
                    await findTrailer(movie.Title);


                if (trailer) {

                    openTrailer(trailer);

                } else {

                    alert(
                        "Trailer not found."
                    );

                }


                watchButton.innerHTML =
                    `<i class="fa-solid fa-play"></i> Watch Trailer`;

                watchButton.disabled = false;

            }
        );

    });

}


// ==========================================
// NO RESULTS
// ==========================================

function showSearchMessage(message) {

    const movieRow =
        document.getElementById("movieRow");

    if (!movieRow) return;

    movieRow.innerHTML = `

        <p class="empty-list">
            ${message}
        </p>

    `;

}


// ==========================================
// RESTORE ORIGINAL MOVIES
// ==========================================

function restoreMovieCards() {

    location.reload();

}


// ==========================================
// SEARCH MOVIE CARDS
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const movieCards =
                document.querySelectorAll(".movie-card");


            movieCards.forEach(card => {

                const movieName =
                    card.dataset.title
                        ? card.dataset.title.toLowerCase()
                        : "";


                if (
                    searchText === "" ||
                    movieName.includes(searchText)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";
                }

            });

        }
    );
}


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("active");

        }
    );
}


const navLinks =
    document.querySelectorAll("#navMenu a");


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove("active");

        }
    );

});


// ==========================================
// MOVIE ROW ARROWS
// ==========================================

const movieRow =
    document.getElementById("movieRow");

const leftArrow =
    document.getElementById("leftArrow");

const rightArrow =
    document.getElementById("rightArrow");


if (rightArrow) {

    rightArrow.addEventListener(
        "click",
        () => {

            movieRow.scrollBy({
                left: 500,
                behavior: "smooth"
            });

        }
    );
}


if (leftArrow) {

    leftArrow.addEventListener(
        "click",
        () => {

            movieRow.scrollBy({
                left: -500,
                behavior: "smooth"
            });

        }
    );
}


// ==========================================
// FAVOURITES
// ==========================================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const favoriteRow =
    document.getElementById("favoriteRow");


favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            button.classList.toggle("active");

            const icon =
                button.querySelector("i");


            if (
                button.classList.contains("active")
            ) {

                icon.classList.remove("fa-regular");

                icon.classList.add("fa-solid");

            } else {

                icon.classList.remove("fa-solid");

                icon.classList.add("fa-regular");
            }


            updateFavorites();

        }
    );

});


// ==========================================
// UPDATE FAVOURITES
// ==========================================

function updateFavorites() {

    if (!favoriteRow) return;

    favoriteRow.innerHTML = "";

    const activeCards =
        document.querySelectorAll(
            ".favorite-btn.active"
        );


    if (activeCards.length === 0) {

        favoriteRow.innerHTML = `
            <p class="empty-list">
                Your favourite movies will appear here.
            </p>
        `;

        return;
    }


    activeCards.forEach(button => {

        const originalCard =
            button.closest(".movie-card");

        const clone =
            originalCard.cloneNode(true);

        const cloneFavorite =
            clone.querySelector(".favorite-btn");


        if (cloneFavorite) {

            cloneFavorite.remove();
        }


        favoriteRow.appendChild(clone);

    });


    const clonedWatchButtons =
        favoriteRow.querySelectorAll(".watch-btn");


    clonedWatchButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openTrailer(
                    button.dataset.videoId
                );

            }
        );

    });
}


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeTrailer();

            if (infoModal) {

                infoModal.classList.remove("active");
            }

        }

    }
);

// ==========================================
// LOAD OMDb POSTERS INTO MOVIE CARDS
// ==========================================

async function loadMoviePosters() {

    const movieCards =
        document.querySelectorAll(".movie-card");

    for (let i = 0; i < movies.length; i++) {

        if (!movieCards[i]) continue;

        const movie = movies[i];

        const data =
            await getMovieFromOMDb(movie.title);

        if (!data) continue;

        // Save OMDb data
        movie.omdb = data;

        // Find poster element
        const poster =
            movieCards[i].querySelector(".poster");

        // Change poster
        if (
            poster &&
            data.Poster &&
            data.Poster !== "N/A"
        ) {

            poster.style.backgroundImage =
                `url("${data.Poster}")`;
        }

        // Movie title
        const title =
            movieCards[i].querySelector(".movie-overlay h3");

        if (title) {
            title.textContent = data.Title;
        }

        // Description
        const description =
            movieCards[i].querySelector(".movie-overlay p");

        if (description) {
            description.textContent =
                data.Plot !== "N/A"
                    ? data.Plot
                    : "No description available.";
        }
    }
}


// Start loading posters
loadMoviePosters();

async function showMovieDetails(imdbID) {

    try {

        const response = await fetch(
            `${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
        );

        const movie =
            await response.json();

        if (movie.Response === "False") {

            alert("Movie details not available.");

            return;
        }


        // Existing info modal use karenge
        if (infoModal && infoTitle && infoText) {

            infoTitle.textContent =
                movie.Title;

            infoText.textContent =
                `${movie.Year} • ${movie.Genre} • ⭐ ${movie.imdbRating}

                ${movie.Plot}`;

            infoModal.classList.add("active");
        }

    } catch (error) {

        console.error(
            "Movie Details Error:",
            error
        );

        alert(
            "Unable to load movie details."
        );
    }
}

// ==========================================
// FIND YOUTUBE TRAILER
// ==========================================

async function findTrailer(movieTitle) {

    try {

        const query =
            `${movieTitle} official trailer`;

        const url =
            `${YOUTUBE_URL}?part=snippet` +
            `&q=${encodeURIComponent(query)}` +
            `&type=video` +
            `&maxResults=1` +
            `&key=${YOUTUBE_API_KEY}`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        if (
            data.items &&
            data.items.length > 0
        ) {

            return data.items[0].id.videoId;

        }

        return null;

    } catch (error) {

        console.error(
            "YouTube API Error:",
            error
        );

        return null;
    }
}


/* =====================================
   OPEN THE SEPARATE MOVIE DETAILS PAGE
===================================== */

function openMovieDetails(movieTitle) {
    if (!movieTitle) return;

    const url = `movie-details.html?movie=${encodeURIComponent(movieTitle)}`;
    window.location.href = url;
}

/*
  Capture clicks before the old trailer-modal handlers
  so movie cards open the new details page instead.
*/

document.addEventListener("click", function (event) {
    // Favourite button should continue working normally.
    if (event.target.closest(".favorite-btn")) {
        return;
    }

    const watchButton = event.target.closest(".watch-btn");

    if (watchButton) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const card = watchButton.closest(".movie-card");
        const title = card?.dataset.title ||
            card?.querySelector(".movie-overlay h3")?.textContent?.trim();

        openMovieDetails(title);
        return;
    }

    const movieCard = event.target.closest(".movie-card");

    if (movieCard) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const title = movieCard.dataset.title ||
            movieCard.querySelector(".movie-overlay h3")?.textContent?.trim();

        openMovieDetails(title);
        return;
    }

    if (event.target.closest("#heroWatchBtn, #heroInfoBtn")) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const title = document.getElementById("heroTitle")?.textContent.trim();
        openMovieDetails(title);
    }
}, true);
