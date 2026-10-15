
const movieData = {
    "stranger things": {
        title: "Stranger Things",
        year: "2016",
        rating: "8.7/10",
        genre: "Sci-Fi, Drama, Horror",
        runtime: "TV Series",
        creator: "The Duffer Brothers",
        cast: "Millie Bobby Brown, Finn Wolfhard, David Harbour",
        description: "When a young boy disappears, his friends and family uncover a mystery involving secret experiments and supernatural forces.",
        poster: "https://m.media-amazon.com/images/I/81DeWbxJTBL._AC_UF894,1000_QL80_.jpg",
        background: "https://i0.wp.com/thefutureoftheforce.com/wp-content/uploads/2025/10/Stranger-Things-5-Official-Poster-Header-FUTURE-OF-THE-FORCE.jpg?fit=1024%2C576&ssl=1",
        trailer: "b9EkMc79ZSU"
    },

    "wednesday": {
        title: "Wednesday",
        year: "2022",
        rating: "8.0/10",
        genre: "Comedy, Mystery, Fantasy",
        runtime: "TV Series",
        creator: "Alfred Gough and Miles Millar",
        cast: "Jenna Ortega, Emma Myers, Catherine Zeta-Jones",
        description: "Wednesday Addams investigates mysterious events while navigating life at Nevermore Academy.",
        poster: "https://m.media-amazon.com/images/I/71M8YFEakfL.jpg",
        background: "https://eastside-online.org/wp-content/uploads/2022/12/wednesday-900x506.jpeg",
        trailer: "Di310WS8zLk"
    },

    "money heist": {
        title: "Money Heist",
        year: "2017",
        rating: "8.2/10",
        genre: "Crime, Thriller, Drama",
        runtime: "TV Series",
        creator: "Álex Pina",
        cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño",
        description: "A mysterious mastermind recruits a team of specialists for an ambitious plan involving the Royal Mint of Spain.",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFzlqSefKXo2H2-1L0WZ8zOG9-DElGR9SKegBmKWkQ0co-DXQWrT4WR-DY&s=10",
        background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG4QYYfZObc8eqSbRxNivp53gn9HFPg6XkC-7utXKBag&s=10",
        trailer: "_InqQJRqGW4"
    },

    "squid game": {
        title: "Squid Game",
        year: "2021",
        rating: "8.0/10",
        genre: "Thriller, Drama, Mystery",
        runtime: "TV Series",
        creator: "Hwang Dong-hyuk",
        cast: "Lee Jung-jae, Park Hae-soo, Jung Ho-yeon",
        description: "People facing financial difficulties enter a mysterious competition where the stakes are much higher than they expect.",
        poster: "https://m.media-amazon.com/images/I/7118ecsxO3L.jpg",
        background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGOxgpryfv1ANIZz6M64HcqH3zHu3GUTNRKAuLwIaBA&s=10",
        trailer: "oqxAJKy0ii4"
    },

    "the witcher": {
        title: "The Witcher",
        year: "2019",
        rating: "8.0/10",
        genre: "Fantasy, Action, Adventure",
        runtime: "TV Series",
        creator: "Lauren Schmidt Hissrich",
        cast: "Henry Cavill, Anya Chalotra, Freya Allan",
        description: "A monster hunter journeys through a fantasy world where people can be more dangerous than the creatures he hunts.",
        poster: "https://m.media-amazon.com/images/I/71ACwyYY3KL.jpg",
        background: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2021/07/the-witcher-season-2-release-date-social-featured.jpg",
        trailer: "ndl1W4ltcmg"
    },

    "dark": {
        title: "Dark",
        year: "2017",
        rating: "8.7/10",
        genre: "Mystery, Crime, Sci-Fi",
        runtime: "TV Series",
        creator: "Baran bo Odar and Jantje Friese",
        cast: "Louis Hofmann, Lisa Vicari, Andreas Pietschmann",
        description: "The disappearance of a child leads four families into a mystery involving secrets, connections and time.",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOvB-kw_Y9glhsTuZU7e8JJGDu_NchdQ4tfL-4EeR_iTl-WgAAF3zWyA&s=10",
        background: "https://foreigncrimedrama.com/wp-content/uploads/2019/05/dark-netflix-s.jpg",
        trailer: "rrwycJ08PSA"
    }
};

const params = new URLSearchParams(window.location.search);
const selectedTitle = (params.get("movie") || "").trim();
const movie = movieData[selectedTitle.toLowerCase()];
const detailsRoot = document.getElementById("detailsRoot");

if (!movie) {
    detailsRoot.innerHTML = `
        <div class="details-status">
            <h2>Movie not found</h2>
            <p>Please return to BLACK!!BOX and select one of the available titles.</p>
            <a class="details-play" href="index.html">Back to Home</a>
        </div>
    `;
} else {
    renderMovieDetails(movie);
}

function renderMovieDetails(item) {
    document.title = `${item.title} | BLACK!!BOX`;

    detailsRoot.innerHTML = `
        <section class="details-hero"
            style="background-image: url('${item.background}')">

            <div class="details-content">
                <p class="details-kicker">BLACK!!BOX ORIGINAL EXPERIENCE</p>

                <h1 class="details-title"></h1>

                <div class="details-meta">
                    <span class="detail-year"></span>
                    <span class="detail-rating"></span>
                    <span class="detail-genre"></span>
                </div>

                <p class="details-plot"></p>

                <div class="details-actions">
                    <button class="details-play" id="playTrailer">
                        <i class="fa-solid fa-play"></i>
                        Watch Trailer
                    </button>

                    <a class="details-secondary" href="index.html">
                        <i class="fa-solid fa-arrow-left"></i>
                        Back to Home
                    </a>
                </div>
            </div>
        </section>

        <section class="details-body">
            <img class="details-poster" alt="Movie poster">

            <div class="details-facts">
                <h2>About this title</h2>

                <p><strong>Release Year:</strong> <span id="factYear"></span></p>
                <p><strong>Rating:</strong> <span id="factRating"></span></p>
                <p><strong>Genre:</strong> <span id="factGenre"></span></p>
                <p><strong>Type:</strong> <span id="factRuntime"></span></p>
                <p><strong>Creator:</strong> <span id="factCreator"></span></p>
                <p><strong>Cast:</strong> <span id="factCast"></span></p>

                <h3>Story</h3>
                <p id="factStory"></p>
            </div>
        </section>

        <section class="details-trailer-section" id="trailerSection" hidden>
            <h2>Watch Trailer</h2>

            <div class="details-video">
                <iframe
                    id="trailerPlayer"
                    title="Movie trailer"
                    src=""
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            </div>
        </section>
    `;

    detailsRoot.querySelector(".details-title").textContent = item.title;
    detailsRoot.querySelector(".detail-year").textContent = item.year;
    detailsRoot.querySelector(".detail-rating").textContent = `⭐ ${item.rating}`;
    detailsRoot.querySelector(".detail-genre").textContent = item.genre;
    detailsRoot.querySelector(".details-plot").textContent = item.description;

    detailsRoot.querySelector(".details-poster").src = item.poster;
    detailsRoot.querySelector(".details-poster").alt = `${item.title} poster`;

    document.getElementById("factYear").textContent = item.year;
    document.getElementById("factRating").textContent = item.rating;
    document.getElementById("factGenre").textContent = item.genre;
    document.getElementById("factRuntime").textContent = item.runtime;
    document.getElementById("factCreator").textContent = item.creator;
    document.getElementById("factCast").textContent = item.cast;
    document.getElementById("factStory").textContent = item.description;

    document.getElementById("playTrailer").addEventListener("click", () => {
        const section = document.getElementById("trailerSection");
        const player = document.getElementById("trailerPlayer");

        player.src = `https://www.youtube-nocookie.com/embed/${item.trailer}?autoplay=1&rel=0`;
        section.hidden = false;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}
