class MovieCard 
{
    constructor(slots, key, favorite, favButtonText)
    {
        this.title = slots.title;
        this.year = slots.year;
        this.genre = slots.genre;
        this.img = slots.img;
        this.summary = slots.summary;
        this.favorite = slots.favorite;

        this.key = key;

        this.favorite = favorite;

        if(this.favorite)
        {
            this.favButtonText = "Remove from favorites"
        }
        else 
        {
            this.favButtonText = "Add to favorites"
        }
    }

    Render()
    //a method that contains the hmtl to make up the cards along with variables for the data
    {
        return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-4" id="${this.key}">
        <article class="card border-0 rounded-0">
            <img class="card-img-top rounded-0" src="img/${this.img}">
            <div class="card-body p-2 bg-light">
                <h5 class="card-title">Title: ${this.title}</h5>
                <p class="card-text">Year: ${this.year}</p>
                <p class="card-text">Genre: ${this.genre}</p>
            </div>
            <a class="btn btn-info w-100 rounded-0" id="favorite" onclick="MovieCard.FavClick('${this.key}')">${this.favButtonText}</a>
        </article>
    </div>`
    }

    static SetupUserInterface()
    //sets up the userinterface by inserting making an instance of the MovieCard class for each object in the database 
    //and inserting it into the page with the Render method
    {
        let allMoviesSection = document.getElementById('allMovies'), favMoviesSection = document.getElementById('favMovies'),
            keys = [], movies = {};

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
    static FavClick(key) 
    {
        
        let movieCard = Movie.instances[key];
        let card = document.getElementById(key);
        let favButton = card.querySelector("#favorite");

        if(!movieCard.favorite)
        {
            movieCard.favorite = true;
            favButton.innerHTML = "Remove from favorites";
            const newParent = document.getElementById('favMovies');
            newParent.appendChild(card);
        }
        else
        {
            movieCard.favorite = false;
            favButton.innerHTML = "Add to favorites";
            const newParent = document.getElementById('allMovies');
            newParent.appendChild(card);
        }
    }
}