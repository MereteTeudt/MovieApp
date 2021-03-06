class MovieCard 
{
    /**
     * @param {Object} slots 
     * @param {Number} key 
     */
    constructor(slots, key)
    {
        this.title = slots.title;
        this.year = slots.year;
        this.genre = slots.genre;
        this.img = slots.img;
        this.summary = slots.summary;
        this.favorite = slots.favorite;

        this.key = key;

        if(this.favorite)
        {
            this.favButtonText = "Remove from favorites"
        }
        else 
        {
            this.favButtonText = "Add to favorites"
        }
    }

    /**
     * A method that contains the hmtl to make up the cards along with variables for the data
     */
    Render()
    {
        let card = 
        `<div class="col-sm-6 col-lg-4 col-xl-3 py-4" id="${this.key}">
            <article class="card cardBorder">
                <img class="card-img img-fluid imgBorder" src="img/${this.img}">
                <div class="card-body p-2 bg-light">
                    <h5 class="card-title">Title: ${this.title}</h5>
                    <p class="card-text">Year: ${this.year}</p>
                    <p class="card-text">Genre: ${this.genre}</p>
                </div>
                <a class="btn buttonColor w-100 rounded-0" id="favorite" onclick="MovieCard.FavClick('${this.key}')">${this.favButtonText}</a>
            </article>
        </div>`
        return card;
    }

    /**
     * Sets up the userinterface by making an instance of the MovieCard class for each object in the database-
     * and inserting it into the page with the Render method
     */
    static SetupUserInterface()
    {
        let allMoviesSection = document.getElementById('allMovies'), 
            favMoviesSection = document.getElementById('favMovies'), 
            keys = [];

        Movie.LoadAll();

        keys = Object.keys(Movie.instances);

        for(let i = 0; i < keys.length; i++)
        {
            const key = keys[i];
            const movieCard = new MovieCard(Movie.instances[key], key, Movie.instances[key].favorite);
           
            if(movieCard.favorite)
            {
                favMoviesSection.insertAdjacentHTML('afterbegin', movieCard.Render());
            }
            else
            {
                allMoviesSection.insertAdjacentHTML('afterbegin', movieCard.Render());
            }
        }
    }

    /**
     * The method that is called when the button on the card is clicked
     * The method checks if the movie is a favorite and switches the buttons function accordingly.
     * @param {Number} key 
     */
    static FavClick(key) 
    {
        let movieCard = Movie.instances[key],
            card = document.getElementById(key),
            favButton = card.querySelector("#favorite");

        if(!movieCard.favorite)
        {
            movieCard.favorite = true;
            Movie.instances[key].favorite = true;
            favButton.innerHTML = "Remove from favorites";
            const newParent = document.getElementById('favMovies');
            newParent.appendChild(card);
        }
        else
        {
            movieCard.favorite = false;
            Movie.instances[key].favorite = false;
            favButton.innerHTML = "Add to favorites";
            const newParent = document.getElementById('allMovies');
            newParent.appendChild(card);
        }
        Movie.SaveAll();
    }
}